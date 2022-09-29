export const wordwrap = ( str: string, width: number, brk: string, cut: boolean ): string => {
  brk = brk || '\n';
  width = width || 75;
  cut = cut || false;

  if (!str) { return str; }

  const regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');

  return str?.match( RegExp(regex, 'g') )?.join( brk ) || str;
}
