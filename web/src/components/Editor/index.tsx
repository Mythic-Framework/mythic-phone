import React, { FC, useEffect, useRef } from 'react';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minified?: boolean;
  appColor?: string;
}

function hexAlpha(hex: string, alpha: number): string {
  try {
    const clean = hex.replace('#', '');
    const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
    const n = parseInt(full, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
  } catch {
    return `rgba(32,134,146,${alpha})`;
  }
}

const formats = ['background','bold','color','font','code','italic','size','strike','script','underline','blockquote','header','indent','list','align','direction','code-block'];

const buildEditorStyles = (T: string) => `
  .ql-teal-theme .ql-toolbar.ql-snow {
    border: 1px solid ${hexAlpha(T, 0.3)};
    border-bottom: 1px solid ${hexAlpha(T, 0.15)};
    border-radius: 10px 10px 0 0;
    background: ${hexAlpha(T, 0.06)};
    padding: 8px 10px;
    font-family: 'Oswald', sans-serif;
  }
  .ql-teal-theme .ql-container.ql-snow {
    border: 1px solid ${hexAlpha(T, 0.3)};
    border-top: none;
    border-radius: 0 0 10px 10px;
    background: rgba(10,13,18,0.6);
  }
  .ql-teal-theme .ql-editor {
    font-family: 'Oswald', sans-serif;
    font-weight: 300;
    min-height: 120px;
    color: rgba(255,255,255,0.9);
    font-size: 14px;
  }
  .ql-teal-theme .ql-editor.ql-blank::before {
    color: rgba(255,255,255,0.25);
    font-style: italic;
    font-family: 'Oswald', sans-serif;
  }
  .ql-teal-theme .ql-snow .ql-stroke { stroke: rgba(255,255,255,0.6); }
  .ql-teal-theme .ql-snow .ql-fill { fill: rgba(255,255,255,0.6); }
  .ql-teal-theme .ql-picker { color: rgba(255,255,255,0.6); }
  .ql-teal-theme .ql-picker-options {
    background: rgba(14,18,26,0.97);
    border: 1px solid ${hexAlpha(T, 0.3)} !important;
    border-radius: 8px;
  }
  .ql-teal-theme .ql-toolbar.ql-snow button:hover .ql-stroke,
  .ql-teal-theme .ql-toolbar.ql-snow button.ql-active .ql-stroke {
    stroke: ${T};
  }
  .ql-teal-theme .ql-toolbar.ql-snow button:hover .ql-fill,
  .ql-teal-theme .ql-toolbar.ql-snow button.ql-active .ql-fill {
    fill: ${T};
  }
  .ql-teal-theme .ql-toolbar.ql-snow .ql-picker-label:hover,
  .ql-teal-theme .ql-toolbar.ql-snow .ql-picker-label.ql-active {
    color: ${T};
  }
  .ql-teal-theme .ql-editor:focus { outline: none; }
  .ql-teal-theme .ql-container.ql-snow:focus-within {
    border-color: ${hexAlpha(T, 0.6)};
  }
`;

const DEFAULT_COLOR = '#208692';

const Editor: FC<Props> = ({ value, onChange, placeholder, minified, appColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const T = appColor ?? DEFAULT_COLOR;

  const modules = {
    toolbar: minified
      ? [['bold','italic','underline','strike'],[{list:'ordered'},{list:'bullet'},{indent:'-1'},{indent:'+1'}],[{color:[]},{background:[]}],['blockquote','code-block']]
      : [[{font:[]},{size:['small',false,'large','huge']}],[{color:[]},{background:[]},'bold','italic','underline'],['strike',{script:'sub'},{script:'super'}],['blockquote','code-block'],[{list:'ordered'},{list:'bullet'},{indent:'-1'},{indent:'+1'}],[{align:[]},'clean']],
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const editorDiv = document.createElement('div');
    containerRef.current.appendChild(editorDiv);

    const quill = new Quill(editorDiv, {
      theme: 'snow',
      placeholder,
      modules,
      formats,
    });

    quillRef.current = quill;

    if (value) quill.clipboard.dangerouslyPasteHTML(value);

    quill.on('text-change', () => {
      onChangeRef.current(quill.root.innerHTML);
    });

    return () => {
      quillRef.current = null;
      containerRef.current?.replaceChildren();
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    const current = quill.root.innerHTML;
    if (value !== current) {
      quill.clipboard.dangerouslyPasteHTML(value ?? '');
    }
  }, [value]);

  return (
    <>
      <style>{buildEditorStyles(T)}</style>
      <div style={{ marginTop: 10 }} className="ql-teal-theme">
        <div ref={containerRef} />
      </div>
    </>
  );
};

export default Editor;
