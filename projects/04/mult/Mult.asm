// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)
// The algorithm is based on repetitive addition.
@i
M=0     // i=0
@R2
M=0     // R2=0

(LOOP)
@R0
D=M     // D=R0
@i
D=D-M   // D=R0-i
@END
D;JEQ   // if R0-i=0, goto END

@R1
D=M     // D=R1
@R2
M=D+M   // R2+=R1

@i
M=M+1   // i++
@LOOP
0;JMP   // goto LOOP

(END)
@END
0;JMP   // infinite loop to end the program
