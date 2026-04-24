// 比较大小，较小的数作为 count，较大的数作为 addend，可以减少循环次数
@R2
M=0

@R0
D=M
@R1
D=D-M   // D=R0-R1
@SWAP
D;JLE   // if R0<=R1, no swap

// R0>R1: count=R1, addend=R0
@R1
D=M
@count
M=D
@R0
D=M
@addend
M=D
@LOOP
0;JMP

(SWAP)
// R0<=R1: count=R0, addend=R1
@R0
D=M
@count
M=D
@R1
D=M
@addend
M=D

(LOOP)
@count
D=M
@END
D;JEQ   // done when count==0

@addend
D=M
@R2
M=D+M   // R2+=addend

@count
M=M-1   // count--
@LOOP
0;JMP

(END)
@END
0;JMP   // infinite loop to end the program
