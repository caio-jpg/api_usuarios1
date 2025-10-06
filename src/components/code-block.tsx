interface CodeBlockProps {
  code: string;
  language?: string;
}

 export function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  return (
    <div className="relative">
      <pre className="bg-muted/50 text-sm p-4 rounded-lg overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
