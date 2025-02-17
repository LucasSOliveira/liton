// vmask-directive.ts
import type { Directive } from 'vue';

interface TokenDefinition {
  test: (char: string) => boolean;
}

const tokenDefinitions: Record<string, TokenDefinition> = {
  '#': { test: (char: string) => /[0-9]/.test(char) }, // aceita dígitos
  'A': { test: (char: string) => /[a-zA-Z]/.test(char) }, // aceita letras
  'N': { test: (char: string) => /[0-9a-zA-Z\s]/.test(char) }, // aceita dígitos, letras e espaço
  'M': { test: (char: string) => /[a-zA-Z\s]/.test(char) }, // aceita letras e espaço
  'X': { test: (_char: string) => true }, // aceita qualquer caractere
  'E': { test: (char: string) => /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~\.\-@]/.test(char) }, // aceita caracteres válidos em um e-mail
  'P': { test: (char: string) => /\S/.test(char) }, // aceita qualquer caractere exceto espaço
};

interface MaskToken {
  type: 'mask';
  char: string;
  optional: boolean;
}

interface LiteralToken {
  type: 'literal';
  value: string;
}

type Token = MaskToken | LiteralToken;

/**
 * Converte a string da máscara em um array de tokens.
 * Suporta a sintaxe "N.repeat(30)" para repetir um token.
 */
function parseMask(mask: string): Token[] {
  const availableTokens = Object.keys(tokenDefinitions).join(''); // por exemplo: "#ANXM"
  const repeatRegex = new RegExp(`^([${availableTokens}])\\.repeat\\((\\d+)\\)$`);

  if (mask.includes('repeat')) {
    const match = mask.match(repeatRegex);
    if (match) {
      const tokenChar = match[1];
      const count = parseInt(match[2], 10);
      return Array.from({ length: count }, () => ({
        type: 'mask',
        char: tokenChar,
        optional: false
      }));
    }
  }
  // Processamento normal se não usar repeat
  const tokens: Token[] = [];
  for (let i = 0; i < mask.length; i++) {
    const char = mask[i];
    if (char === '?') {
      if (tokens.length > 0 && tokens[tokens.length - 1].type === 'mask') {
        (tokens[tokens.length - 1] as MaskToken).optional = true;
      }
      continue;
    }
    if (tokenDefinitions[char]) {
      tokens.push({ type: 'mask', char, optional: false });
    } else {
      tokens.push({ type: 'literal', value: char });
    }
  }
  return tokens;
}
/**
 * Aplica a máscara ao valor de entrada utilizando os tokens.
 */
function applyMask(value: string, tokens: Token[]): string {
  let result = '';
  let valueIndex = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === 'literal') {
      result += token.value;
      if (value[valueIndex] === token.value) {
        valueIndex++;
      }
    } else if (token.type === 'mask') {
      if (valueIndex >= value.length) {
        if (token.optional) {
          continue;
        } else {
          break;
        }
      }

      let currentChar = value[valueIndex];
      if (tokenDefinitions[token.char].test(currentChar)) {
        result += currentChar;
        valueIndex++;
      } else {
        if (!token.optional) {
          while (valueIndex < value.length && !tokenDefinitions[token.char].test(value[valueIndex])) {
            valueIndex++;
          }
          if (valueIndex < value.length) {
            result += value[valueIndex];
            valueIndex++;
          }
        }
      }
    }
  }

  return result;
}

/**
 * Diretiva v-mask para Vue 3.
 */
const vMask: Directive = {
  mounted(el, binding) {
    const maskPattern = binding.value;
    if (typeof maskPattern !== 'string') return;

    const tokens = parseMask(maskPattern);

    const onInput = (e: Event) => {
      const input = e.target as HTMLInputElement;

      // Se já estivermos processando, não faça nada
      if ((input as any)._maskProcessing) return;
      (input as any)._maskProcessing = true;

      const originalValue = input.value;
      const maskedValue = applyMask(originalValue, tokens);

      // Apenas atualiza e dispara novo evento se o valor foi alterado
      if (maskedValue !== originalValue) {
        input.value = maskedValue;
        input.dispatchEvent(new Event('input'));
      }

      (input as any)._maskProcessing = false;
    };

    el.addEventListener('input', onInput);
  }
};

export default vMask;
