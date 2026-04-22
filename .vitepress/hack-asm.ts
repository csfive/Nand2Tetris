import type { LanguageRegistration } from 'shiki'

export const hackAsmLanguage = {
  name: 'asm',
  scopeName: 'source.hack-asm',
  displayName: 'Hack ASM',
  aliases: ['hack-asm', 'hackasm', 'hack'],
  patterns: [
    { include: '#line-comment' },
    { include: '#label' },
    { include: '#a-instruction' },
    { include: '#dest' },
    { include: '#comp' },
    { include: '#jump' },
    { include: '#predefined-symbol' },
    { include: '#number' },
    { include: '#operator' },
    { include: '#punctuation' },
  ],
  repository: {
    'line-comment': {
      name: 'comment.line.double-slash.hack-asm',
      match: '//.*$',
    },
    label: {
      match: '^\\s*(\\()\\s*([A-Za-z_.$:][A-Za-z0-9_.$:]*)\\s*(\\))',
      captures: {
        1: { name: 'punctuation.definition.label.begin.hack-asm' },
        2: { name: 'entity.name.label.hack-asm' },
        3: { name: 'punctuation.definition.label.end.hack-asm' },
      },
    },
    'a-instruction': {
      match: '@\\s*([A-Za-z_.$:][A-Za-z0-9_.$:]*|\\d+)',
      captures: {
        0: { name: 'meta.instruction.a.hack-asm' },
        1: { name: 'variable.other.symbol.hack-asm' },
      },
    },
    dest: {
      match: '\\b(?:M|D|MD|A|AM|AD|AMD)\\b(?=\\s*=)',
      name: 'variable.other.destination.hack-asm',
    },
    comp: {
      match:
        '(?<![A-Za-z0-9_.$:])(?:0|1|-1|D|A|M|!D|!A|!M|-D|-A|-M|D\\+1|A\\+1|M\\+1|D-1|A-1|M-1|D\\+A|D\\+M|D-A|D-M|A-D|M-D|D&A|D&M|D\\|A|D\\|M)(?![A-Za-z0-9_.$:])',
      name: 'keyword.operator.comp.hack-asm',
    },
    jump: {
      match: '\\b(?:JGT|JEQ|JGE|JLT|JNE|JLE|JMP)\\b',
      name: 'keyword.control.jump.hack-asm',
    },
    'predefined-symbol': {
      match: '\\b(?:SP|LCL|ARG|THIS|THAT|SCREEN|KBD|R(?:1[0-5]|[0-9]))\\b',
      name: 'variable.language.predefined.hack-asm',
    },
    number: {
      match: '\\b\\d+\\b',
      name: 'constant.numeric.hack-asm',
    },
    operator: {
      match: '[-+!&|]',
      name: 'keyword.operator.hack-asm',
    },
    punctuation: {
      match: '[@()=;]',
      name: 'punctuation.definition.hack-asm',
    },
  },
} satisfies LanguageRegistration
