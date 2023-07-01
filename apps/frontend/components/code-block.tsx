'use client';

import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';

import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import clojure from 'react-syntax-highlighter/dist/cjs/languages/prism/clojure';
import csharp from 'react-syntax-highlighter/dist/cjs/languages/prism/csharp';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import diff from 'react-syntax-highlighter/dist/cjs/languages/prism/diff';
import elm from 'react-syntax-highlighter/dist/cjs/languages/prism/elm';
import fsharp from 'react-syntax-highlighter/dist/cjs/languages/prism/fsharp';
import haskell from 'react-syntax-highlighter/dist/cjs/languages/prism/haskell';
import java from 'react-syntax-highlighter/dist/cjs/languages/prism/java';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import lisp from 'react-syntax-highlighter/dist/cjs/languages/prism/lisp';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import kotlin from 'react-syntax-highlighter/dist/cjs/languages/prism/kotlin';
import less from 'react-syntax-highlighter/dist/cjs/languages/prism/less';
import html from 'react-syntax-highlighter/dist/cjs/languages/prism/markup';
import nix from 'react-syntax-highlighter/dist/cjs/languages/prism/nix';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import rust from 'react-syntax-highlighter/dist/cjs/languages/prism/rust';
import scala from 'react-syntax-highlighter/dist/cjs/languages/prism/scala';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import swift from 'react-syntax-highlighter/dist/cjs/languages/prism/swift';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';

import oneDark from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('clojure', clojure);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('diff', diff);
SyntaxHighlighter.registerLanguage('elm', elm);
SyntaxHighlighter.registerLanguage('fsharp', fsharp);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('haskell', haskell);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('javascript', jsx);
SyntaxHighlighter.registerLanguage('js', jsx);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('kotlin', kotlin);
SyntaxHighlighter.registerLanguage('less', less);
SyntaxHighlighter.registerLanguage('lisp', lisp);
SyntaxHighlighter.registerLanguage('nix', nix);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('scala', scala);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('swift', swift);
SyntaxHighlighter.registerLanguage('ts', tsx);
SyntaxHighlighter.registerLanguage('typescript', tsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);

type CodeBlockProps = {
  language: string;
  code: string;
};

export function CodeBlock(props: CodeBlockProps) {
  if (!isValidCodeBlockProps(props)) {
    return null;
  }

  const { language, code } = props;

  return (
    <div className="overflow-hidden rounded-md">
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        showLineNumbers
        customStyle={{ margin: 0 }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function isValidCodeBlockProps(props: unknown): props is CodeBlockProps {
  if (typeof props !== 'object' || props === null) {
    return false;
  }

  const { language, code } = props as CodeBlockProps;
  if ([language, code].some((prop) => typeof prop !== 'string')) {
    return false;
  }

  return true;
}
