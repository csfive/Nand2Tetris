import sys
from pathlib import Path

A_COMMAND = "A_COMMAND"
C_COMMAND = "C_COMMAND"
L_COMMAND = "L_COMMAND"


# =========================
# Parser Module
# =========================
class Parser:
    """Parses Hack assembly commands and exposes their fields."""

    def __init__(self, input_file):
        with input_file.open() as file:
            self.commands = self._clean_lines(file.readlines())
        self.current_index = -1
        self.current_command = None

    def _clean_lines(self, lines):
        cleaned = []

        for line in lines:
            line = line.split("//")[0].strip()
            if line != "":
                cleaned.append(line)

        return cleaned

    def has_more_commands(self):
        return self.current_index + 1 < len(self.commands)

    def advance(self):
        self.current_index += 1
        self.current_command = self.commands[self.current_index]

    def command_type(self):
        if self.current_command.startswith("@"):
            return A_COMMAND
        if self.current_command.startswith("(") and self.current_command.endswith(")"):
            return L_COMMAND
        return C_COMMAND

    def symbol(self):
        if self.command_type() == A_COMMAND:
            return self.current_command[1:]
        if self.command_type() == L_COMMAND:
            return self.current_command[1:-1]
        return None

    def dest(self):
        if "=" not in self.current_command:
            return None
        return self.current_command.split("=")[0]

    def comp(self):
        command = self.current_command

        if "=" in command:
            command = command.split("=")[1]
        if ";" in command:
            command = command.split(";")[0]

        return command

    def jump(self):
        if ";" not in self.current_command:
            return None
        return self.current_command.split(";")[1]


# =========================
# Code Module
# =========================
class Code:
    """Translates Hack assembly mnemonics into binary codes."""

    DEST_TABLE = {
        None: "000",
        "M": "001",
        "D": "010",
        "MD": "011",
        "DM": "011",
        "A": "100",
        "AM": "101",
        "MA": "101",
        "AD": "110",
        "DA": "110",
        "AMD": "111",
        "ADM": "111",
        "MAD": "111",
        "MDA": "111",
        "DAM": "111",
        "DMA": "111",
    }

    COMP_TABLE = {
        "0": "0101010",
        "1": "0111111",
        "-1": "0111010",
        "D": "0001100",
        "A": "0110000",
        "!D": "0001101",
        "!A": "0110001",
        "-D": "0001111",
        "-A": "0110011",
        "D+1": "0011111",
        "A+1": "0110111",
        "D-1": "0001110",
        "A-1": "0110010",
        "D+A": "0000010",
        "A+D": "0000010",
        "D-A": "0010011",
        "A-D": "0000111",
        "D&A": "0000000",
        "A&D": "0000000",
        "D|A": "0010101",
        "A|D": "0010101",
        "M": "1110000",
        "!M": "1110001",
        "-M": "1110011",
        "M+1": "1110111",
        "M-1": "1110010",
        "D+M": "1000010",
        "M+D": "1000010",
        "D-M": "1010011",
        "M-D": "1000111",
        "D&M": "1000000",
        "M&D": "1000000",
        "D|M": "1010101",
        "M|D": "1010101",
    }

    JUMP_TABLE = {
        None: "000",
        "JGT": "001",
        "JEQ": "010",
        "JGE": "011",
        "JLT": "100",
        "JNE": "101",
        "JLE": "110",
        "JMP": "111",
    }

    @classmethod
    def dest(cls, mnemonic):
        return cls.DEST_TABLE[mnemonic]

    @classmethod
    def comp(cls, mnemonic):
        return cls.COMP_TABLE[mnemonic]

    @classmethod
    def jump(cls, mnemonic):
        return cls.JUMP_TABLE[mnemonic]


# =========================
# Symbol Table Module
# =========================
class SymbolTable:
    """Keeps a correspondence between symbols and numeric addresses."""

    def __init__(self):
        self.table = {
            "SP": 0,
            "LCL": 1,
            "ARG": 2,
            "THIS": 3,
            "THAT": 4,
            "SCREEN": 16384,
            "KBD": 24576,
        }

        for i in range(16):
            self.table[f"R{i}"] = i

    def add_entry(self, symbol, address):
        self.table[symbol] = address

    def contains(self, symbol):
        return symbol in self.table

    def get_address(self, symbol):
        return self.table[symbol]


# =========================
# Main Program
# =========================
def first_pass(input_file, symbol_table):
    """Add labels to the symbol table. Generates no code."""
    parser = Parser(input_file)
    rom_address = 0

    while parser.has_more_commands():
        parser.advance()
        command_type = parser.command_type()

        if command_type == L_COMMAND:
            symbol = parser.symbol()
            symbol_table.add_entry(symbol, rom_address)
        else:
            rom_address += 1


def second_pass(input_file, output_file, symbol_table):
    """Translate A- and C-commands. Allocate new variables from RAM address 16."""
    parser = Parser(input_file)
    next_variable_address = 16

    with output_file.open("w") as file:
        while parser.has_more_commands():
            parser.advance()
            command_type = parser.command_type()

            if command_type == L_COMMAND:
                continue

            if command_type == A_COMMAND:
                symbol = parser.symbol()

                if symbol.isdigit():
                    address = int(symbol)
                else:
                    if not symbol_table.contains(symbol):
                        symbol_table.add_entry(symbol, next_variable_address)
                        next_variable_address += 1
                    address = symbol_table.get_address(symbol)

                file.write(format(address, "016b") + "\n")

            elif command_type == C_COMMAND:
                comp_bits = Code.comp(parser.comp())
                dest_bits = Code.dest(parser.dest())
                jump_bits = Code.jump(parser.jump())
                file.write("111" + comp_bits + dest_bits + jump_bits + "\n")


def assemble(input_file):
    symbol_table = SymbolTable()
    output_file = input_file.with_suffix(".hack")

    first_pass(input_file, symbol_table)
    second_pass(input_file, output_file, symbol_table)


def main():
    if len(sys.argv) != 2:
        print("Usage: python assembler.py Xxx.asm")
        sys.exit(1)

    input_file = Path(sys.argv[1])

    if input_file.suffix != ".asm":
        print("Error: input file must end with .asm")
        sys.exit(1)

    assemble(input_file)


if __name__ == "__main__":
    main()
