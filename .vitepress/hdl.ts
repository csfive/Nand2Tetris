import type { LanguageRegistration } from 'shiki'

export const hdlLanguage = {
  name: 'hdl',
  scopeName: 'source.hdl',
  displayName: 'HDL',
  patterns: [
    { include: '#block-comment' },
    { include: '#line-comment' },
    { include: '#chip-declaration' },
    { include: '#keyword' },
    { include: '#named-parameter' },
    { include: '#part-call' },
    { include: '#number' },
    { include: '#punctuation' },
  ],
  repository: {
    'block-comment': {
      name: 'comment.block.hdl',
      begin: '/\\*',
      end: '\\*/',
    },
    'line-comment': {
      name: 'comment.line.double-slash.hdl',
      match: '//.*$',
    },
    'chip-declaration': {
      begin: '^\\s*CHIP\\s+',
      beginCaptures: {
        0: { name: 'keyword.control.hdl' },
      },
      end: '\\{',
      endCaptures: {
        0: { name: 'punctuation.section.block.begin.hdl' },
      },
      name: 'meta.declaration.chip.hdl',
      patterns: [{ match: '[A-Za-z_][A-Za-z0-9_]*', name: 'entity.name.type.hdl' }],
    },
    keyword: {
      match: '\\b(?:IN|OUT|PARTS|BUILTIN|CLOCKED)\\b',
      name: 'keyword.control.hdl',
    },
    'named-parameter': {
      match: '\\b([A-Za-z_][A-Za-z0-9_]*)\\s*(?==)',
      captures: {
        1: { name: 'variable.parameter.hdl' },
      },
    },
    'part-call': {
      match: '\\b([A-Za-z_][A-Za-z0-9_]*)\\s*(?=\\()',
      captures: {
        1: { name: 'support.function.hdl' },
      },
    },
    number: {
      match: '\\b\\d+\\b',
      name: 'constant.numeric.hdl',
    },
    punctuation: {
      match: '[{}()\\[\\];,=]',
      name: 'punctuation.definition.hdl',
    },
  },
} satisfies LanguageRegistration
