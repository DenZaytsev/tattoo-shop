const NON_BREAKING_SPACE = String.fromCharCode(160);
const NON_BREAKING_HYPHEN = String.fromCharCode(8209);

function trimEnd(str: string) {
  return str.replace(/\s+$/g, '');
}

export function beautify(str: string) {
  if (!str) return str;

  return (
    str
      // Сделать нормальные кавычки
      .replace(
        /("|"|&quot;)(.+?)("|"|&quot;)/gi,
        (_1, _2, inner) => `«${inner}»`,
      )
      // Тире правильной длинны
      .replace(/(\s*?)(—)(\s*)/gi, ` — `)
      // Неразрывные пробелы в нужных местах
      .replace(
        /\s+.{1,2}(\s+)/gi,
        (match) => `${trimEnd(match)}${NON_BREAKING_SPACE}`,
      )
      // Неразрывный минус в нужных местах
      .replace('-', NON_BREAKING_HYPHEN)
  );
}
