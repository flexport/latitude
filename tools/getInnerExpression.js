/**
 * TEAM: frontend_infra
 *
 * @flow
 */
export default function getInnerExpression(expression: any): string {
  if (typeof expression === "string") {
    return expression
      .split("(")
      .pop()
      .replace(/[)]/g, "");
  }

  if (typeof expression === "symbol") {
    if (expression.toString() === "Symbol(react.lazy)") {
      return "React.lazy";
    }
  }

  return "";
}
