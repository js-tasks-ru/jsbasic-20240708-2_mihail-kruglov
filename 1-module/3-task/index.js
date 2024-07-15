function ucFirst(str) {
  let first_symbol = str.charAt(0);
  let first_symbol_Upper = first_symbol.toUpperCase();
  let symbols_without_first = str.slice(1)
  return first_symbol_Upper + symbols_without_first
}
