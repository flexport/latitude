/**
 * TEAM: shipment_data
 *
 * @flow strict-local
 */

import * as React from "react";
import ReactMarkdown from "react-markdown";
import type {
  Renderers,
  HtmlRendererProps,
  BaseRendererProps,
} from "react-markdown";
import ReactDOMServer from "react-dom/server";
import xss from "xss";

export type MarkdownProps = {|
  +source: ?string,
  +renderer?: Renderers,
  +enableHtml?: boolean,
  +breaks?: boolean,
|};

export default function Markdown(props: MarkdownProps) {
  const {source, enableHtml, breaks = true} = props;
  let renderer = {...defaultRenderer, ...props.renderer};

  if (breaks) {
    const breakRenderer = renderer.break;
    const textRenderer = renderer.text;
    renderer = {
      ...renderer,
      text: wrapTextWithBreaks(textRenderer, breakRenderer),
    };
  }

  return (
    <ReactMarkdown
      source={source || ""}
      escapeHtml={!enableHtml}
      // enableHtml is only used to control escapeHtml, because it is a safer
      // failure mode to be able to see the content in the escaped HTML, whereas
      // if content just disappears entirely someone might be blocked.
      skipHtml={false}
      renderers={renderer}
    />
  );
}

export function renderMarkdownToHtmlString(props: MarkdownProps): string {
  const renderer: Renderers = {...defaultRenderer, ...props.renderer};
  const newProps = {...props, renderer};
  return ReactDOMServer.renderToStaticMarkup(<Markdown {...newProps} />);
}

export function renderMarkdownToPlainString(props: MarkdownProps): string {
  const renderer: Renderers = {...plainTextRenderer, ...props.renderer};
  return renderMarkdownToHtmlString({...props, renderer});
}

const defaultRenderer = {
  break: () => <br />,
  text: ({children}) => children,
  html: XSSSafeHtml,
};

function wrapTextWithBreaks(
  TextRenderer: BaseRendererProps => React.Node,
  BreakRenderer: BaseRendererProps => React.Node
) {
  function wrappedTextRenderer({children}: {|+children: string|}) {
    const parts = children.split(/(\n+)/).map((part, index) => {
      if (part.includes("\n")) {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <BreakRenderer key={`br-${index}`}>{undefined}</BreakRenderer>
        );
      }
      return (
        // eslint-disable-next-line react/no-array-index-key
        <TextRenderer key={`str-${index}`}>{part}</TextRenderer>
      );
    });
    // Wrap with span as a workaround for removeChild error
    // See: https://github.com/facebook/react/issues/11538#issuecomment-390386520
    return <span>{parts}</span>;
  }
  return wrappedTextRenderer;
}

function ChildPassthroughRenderer(props: {+children: React.Node}) {
  return <>{props.children}</>;
}

function nullRenderer() {
  return null;
}

const plainTextRenderer: Renderers = {
  break: () => "\n",
  paragraph: ChildPassthroughRenderer,
  emphasis: ChildPassthroughRenderer,
  strong: ChildPassthroughRenderer,
  thematicBreak: () => "\n",
  blockquote: ChildPassthroughRenderer,
  delete: ChildPassthroughRenderer,
  link: ChildPassthroughRenderer,
  linkReference: ChildPassthroughRenderer,
  image: nullRenderer,
  imageReference: nullRenderer,
  table: ChildPassthroughRenderer,
  tableHead: ChildPassthroughRenderer,
  tableBody: ChildPassthroughRenderer,
  tableRow: props => (
    <>
      {props.children}
      {"\n"}
    </>
  ),
  tableCell: props => <> {props.children}</>,
  root: ChildPassthroughRenderer,
  text: ChildPassthroughRenderer,
  list: ChildPassthroughRenderer,
  listItem: props => (
    <>
      {props.children}
      {"\n"}
    </>
  ),
  heading: ChildPassthroughRenderer,
  inlineCode: ChildPassthroughRenderer,
  code: props => props.value,
  html: nullRenderer,
};

const xssOpts = {
  whiteList: xss.getDefaultWhiteList(),
  onTagAttr: (tag: string, name: string) => {
    // If the link has a rel tag, we overwrite it with noreferrer/noopener to
    // prevent tabnapping. We can't just insert it into all tags because xss
    // does not provide a callback that allows you to insert new attributes.
    if (tag === "a" && name === "rel") {
      return 'rel="noreferrer noopener"';
    }
    return undefined;
  },
};

function XSSSafeHtml(props: HtmlRendererProps) {
  const safeHtml = React.useMemo(() => xss(props.value, xssOpts), [
    props.value,
  ]);

  if (props.skipHtml) {
    return null;
  }

  if (props.escapeHtml) {
    return <>{safeHtml}</>;
  }

  if (props.isBlock) {
    // eslint-disable-next-line react/no-danger
    return <div dangerouslySetInnerHTML={{__html: safeHtml}} />;
  }
  // eslint-disable-next-line react/no-danger
  return <span dangerouslySetInnerHTML={{__html: safeHtml}} />;
}
