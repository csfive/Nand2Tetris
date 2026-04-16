import type { LanguageRegistration } from 'shiki'

export const chipApiLanguage = {
  name: 'chip',
  scopeName: 'text.chip-api',
  displayName: 'CHIP',
  patterns: [
    { include: '#block-comment' },
    { include: '#line-comment' },
    { include: '#field-key' },
    { include: '#control-keyword' },
    { include: '#number' },
    { include: '#punctuation' },
  ],
  repository: {
    'block-comment': {
      name: 'comment.block.chip-api',
      begin: '/\\*',
      end: '\\*/',
    },
    'line-comment': {
      name: 'comment.line.double-slash.chip-api',
      match: '//.*$',
    },
    'field-key': {
      match: '^(\\s*)(芯片名|输入|输出|功能|说明)(?=：)',
      captures: {
        2: { name: 'keyword.control.chip-api' },
      },
    },
    'control-keyword': {
      match: '\\b(?:if|then|else|for|If|Then|Else|For)\\b',
      name: 'keyword.operator.word.chip-api',
    },
    number: {
      match: '\\b\\d+\\b',
      name: 'constant.numeric.chip-api',
    },
    punctuation: {
      match: '[{}()\\[\\],.:=]',
      name: 'punctuation.definition.chip-api',
    },
  },
} satisfies LanguageRegistration
