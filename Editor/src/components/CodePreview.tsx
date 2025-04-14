import React, { useEffect, useState } from 'react';
import { AlertTriangle, Play, CheckCircle2 } from 'lucide-react';
import prettier from 'prettier';

interface CodePreviewProps {
  code: string;
  language: string;
}

export function CodePreview({ code, language }: CodePreviewProps) {
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isFormatted, setIsFormatted] = useState(true);

  useEffect(() => {
    if (language === 'javascript') {
      try {
        // Basic code validation
        new Function(code);
        setError(null);

        // Check if code is properly formatted
        prettier.format(code, { parser: 'babel' }).then(formattedCode => {
          setIsFormatted(formattedCode.trim() === code.trim());
        }).catch(() => {
          setIsFormatted(false);
        });

        // Execute code in a safe context
        const consoleLog = console.log;
        const outputs: string[] = [];
        console.log = (...args) => {
          outputs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        new Function(code)();
        console.log = consoleLog;

        setOutput(outputs.join('\n'));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setOutput('');
      }
    }
  }, [code, language]);

  if (language !== 'javascript') {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-latte-blue dark:text-mocha-blue" />
          <h3 className="font-medium">Output Preview</h3>
        </div>
        {isFormatted ? (
          <div className="flex items-center gap-1 text-xs text-latte-green dark:text-mocha-green">
            <CheckCircle2 className="w-4 h-4" />
            <span>Properly formatted</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs text-latte-peach dark:text-mocha-peach">
            <AlertTriangle className="w-4 h-4" />
            <span>Code could be better formatted</span>
          </div>
        )}
      </div>

      <div className="border-2 border-latte-surface1 dark:border-mocha-surface1 bg-latte-surface0/50 dark:bg-mocha-surface0/50">
        {error ? (
          <div className="p-4 text-sm text-latte-red dark:text-mocha-red font-mono">
            {error}
          </div>
        ) : output ? (
          <pre className="p-4 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
            {output}
          </pre>
        ) : (
          <div className="p-4 text-sm text-latte-overlay0 dark:text-mocha-overlay0">
            No output (try adding some console.log statements)
          </div>
        )}
      </div>
    </div>
  );
}