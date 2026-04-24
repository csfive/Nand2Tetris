// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel. When no key is pressed,
// the screen should be cleared.
(LOOP)
@KBD
D=M
@BLACK
D;JNE
@WHITE
0;JMP

(BLACK)
@color
M=-1
@INIT
0;JMP

(WHITE)
@color
M=0

(INIT)
@SCREEN
D=A
@addr
M=D         // screen base address
@8192
D=A
@count
M=D         // count=8192=32*256, number of screen words

(FILL)
@count
D=M
@LOOP
D;JEQ       // done filling, go check keyboard again

@color
D=M
@addr
A=M
M=D         // RAM[addr]=color

@addr
M=M+1       // addr++
@count
M=M-1       // count--

@FILL
0;JMP
