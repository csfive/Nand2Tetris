# Chapter 01: Boolean Logic

> Such simple things, And we make of them something so complex it defeats us, Almost.
>
> — John Ashbery (b. 1927), American poet

Every digital device—be it a personal computer, a cellular telephone, or a network
router—is based on a set of chips designed to store and process information. Although
these chips come in different shapes and forms, they are all made from the same building
blocks: Elementary logic gates. The gates can be physically implemented in many different
materials and fabrication technologies, but their logical behavior is consistent across
all computers. In this chapter we start out with one primitive logic gate—Nand—and
build all the other logic gates from it. The result is a rather standard set of
gates, which will be later used to construct our computer’s processing and storage chips.
This will be done in chapters 2 and 3, respectively.

All the hardware chapters in the book, beginning with this one, have the same structure.
Each chapter focuses on a well-defined task, designed to construct or integrate a certain
family of chips. The prerequisite knowledge needed to approach this task is provided in
a brief Background section. The next section provides a complete Specification of the
chips’ abstractions, namely, the various services that they should deliver, one way or another.
Having presented the what, a subsequent Implementation section proposes guidelines and hints
about how the chips can be actually implemented. A Perspective section rounds up the chapter
with concluding comments about important topics that were left out from the discussion. Each
chapter ends with a technical Project section. This section gives step-by-step instructions for
actually building the chips on a personal computer, using the hardware simulator supplied with the book.

This being the first hardware chapter in the book, the Background section is somewhat lengthy,
featuring a special section on hardware description and simulation tools.

## 1.1 Background

This chapter focuses on the construction of a family of simple chips called Boolean
gates. Since Boolean gates are physical implementations of Boolean functions, we
start with a brief treatment of Boolean algebra. We then show how Boolean gates
implementing simple Boolean functions can be interconnected to deliver the functionality
of more complex chips. We conclude the background section with a description of how
hardware design is actually done in practice, using software simulation tools.

### 1.1.1 Boolean Algebra

Boolean algebra deals with Boolean (also called binary) values that are typically
labeled true/false, 1/0, yes/no, on/off, and so forth. We will use 1 and 0. A Boolean
function is a function that operates on binary inputs and returns binary outputs.
Since computer hardware is based on the representation and manipulation of binary
values, Boolean functions play a central role in the specification, construction, and
optimization of hardware architectures. Hence, the ability to formulate and analyze
Boolean functions is the first step toward constructing computer architectures.

**Truth Table Representation** The simplest way to specify a Boolean function is to
enumerate all the possible values of the function’s input variables, along with the
function’s output for each set of inputs. This is called the truth table representation of
the function, illustrated in [figure 1.1](#1.1).
The first three columns of [figure 1.1](#1.1) enumerate all the possible binary values of the
function’s variables. For each one of the $2^n$ possible tuples $(v_1 \dots v_n)$ (here n = 3), the
last column gives the value of $f(v_1 \dots v_n)$.

**Boolean Expressions** In addition to the truth table specification, a Boolean function
can also be specified using Boolean operations over its input variables. The basic
Boolean operators that are typically used are ‘‘And’’ ($x$ And $y$ is 1 exactly when both
$x$ and $y$ are 1) ‘‘Or’’ ($x$ Or $y$ is 1 exactly when either $x$ or $y$ or both are 1),
and ‘‘Not’’ (Not $x$ is 1 exactly when $x$ is 0).
We will use a common arithmetic-like notation for these operations:
$x \cdot y$ (or $xy$) means $x$ And $y$, $x + y$ means $x$ Or $y$, and $\bar{x}$ means Not x.
To illustrate, the function defined in [figure 1.1](#1.1) is equivalently given by the Boolean expression

$$
f(x, y, z)=(x + y) \cdot \bar{z}
$$

For example, let us evaluate this expression on the inputs
$x = 0, y = 1, z = 0$ (third row in the table). Since $y$ is 1, it follows that
$x + y = 1$ and thus $1 \cdot \bar{0} = 1 \cdot 1 = 1$.
The complete verification of the equivalence between the expression and
the truth table is achieved by evaluating the expression
on each of the eight possible input combinations, verifying that it yields the same
value listed in the table’s right column.

<ImageGroup
  id="1.1"
  :sources="['/1.1.png']"
  type="manual"
  width="300px"
  caption="Figure 1.1 Truth table representation of a Boolean function (example)."
/>

**Canonical Representation** As it turns out, every Boolean function can be expressed
using at least one Boolean expression called the canonical representation. Starting
with the function’s truth table, we focus on all the rows in which the function has
value 1. For each such row, we construct a term created by And-ing together literals
(variables or their negations) that fix the values of all the row’s inputs. For example,
let us focus on the third row in [figure 1.1](#1.1), where the function’s value is 1.
Since the variable values in this row are $x = 0, y = 1, z = 0$, we construct the term
$\bar{x} y \bar{z}$. Following the same procedure, we construct the terms
$x \bar{y} \bar{z}$ and $xy \bar{z}$ for rows 5 and 7.
Now, if we Or-together all these terms (for all the rows where the function has value 1),
we get a Boolean expression that is equivalent to the given truth table. Thus the canonical
representation of the Boolean function shown in [figure 1.1](#1.1) is

$$
f(x, y, z) = \bar{x} y \bar{z} + x \bar{y} \bar{z} + xy \bar{z}
$$

This construction leads to an important conclusion: Every Boolean function, no matter how complex,
can be expressed using three Boolean operators only: And, Or, and Not.

**Two-Input Boolean Functions** An inspection of [figure 1.1](#1.1) reveals that the number of
Boolean functions that can be defined over n binary variables is $2^{2^{n}}$. For example,
the sixteen Boolean functions spanned by two variables are listed in [figure 1.2](#1.2). These
functions were constructed systematically, by enumerating all the possible 4-wise
combinations of binary values in the four right columns. Each function has a conventional
name that seeks to describe its underlying operation. Here are some examples: The
name of the Nor function is shorthand for Not-Or: Take the Or of $x$ and $y$, then
negate the result. The Xor function—shorthand for ‘‘exclusive or’’—returns 1 when
its two variables have opposing truth-values and 0 otherwise. Conversely, the
Equivalence function returns 1 when the two variables have identical truth-values.
The If-x-then-y function (also known as $x \to y$, or ‘‘$x$ Implies $y$’’) returns 1 when x is
0 or when both $x$ and $y$ are 1. The other functions are self-explanatory.

<ImageGroup
  id="1.2"
  :sources="['/1.2.png']"
  type="manual"
  width="450px"
  caption="Figure 1.2 All the Boolean functions of two variables."
/>

### 1.1.2 Gate Logic

## 1.2 Specification

This section specifies a typical set of gates, each designed to carry out a common
Boolean operation. These gates will be used in the chapters that follow to construct
the full architecture of a typical modern computer. Our starting point is a single
primitive Nand gate, from which all other gates will be derived recursively. Note that
we provide only the gates’ specifications, or interfaces, delaying implementation
details until a subsequent section. Readers who wish to construct the specified gates
in HDL are encouraged to do so, referring to appendix A as needed. All the gates
can be built and simulated on a personal computer, using the hardware simulator
supplied with the book.

<ImageGroup
  id="1.7"
  :sources="['/1.7.png']"
  type="manual"
  width="600px"
  caption="Figure 1.7 A screen shot of simulating an Xor chip on the hardware simulator. The simulator
state is shown just after the test script has completed running. The pin values correspond to the
last simulation step (a = b = 1). Note that the output file generated by the simulation is consistent with the Xor truth table, indicating that the loaded HDL program delivers a correct
Xor functionality. The compare file, not shown in the figure and typically specified by the
chip’s client, has exactly the same structure and contents as that of the output file. The fact
that the two files agree with each other is evident from the status message displayed at the
bottom of the screen."
/>

### 1.2.1 The Nand Gate

The starting point of our computer architecture is the Nand gate, from which all
other gates and chips are built. The Nand gate is designed to compute the following
Boolean function:

| a   | b   | Nand(a,b) |
| --- | --- | --------- |
| 0   | 0   | 1         |
| 0   | 1   | 1         |
| 1   | 0   | 1         |
| 1   | 1   | 0         |

Throughout the book, we use ‘‘chip API boxes’’ to specify chips. For each chip, the
API specifies the chip name, the names of its input and output pins, the function or
operation that the chip effects, and an optional comment.

```
Chip name: Nand
Inputs:    a, b
Outputs:   out
Function:  If a=b=1 then out=0 else out=1
Comment:   This gate is considered primitive and thus there is
           no need to implement it.
```

### 1.2.2 Basic Logic Gates

Some of the logic gates presented here are typically referred to as ‘‘elementary’’ or
‘‘basic.’’ At the same time, every one of them can be composed from Nand gates
alone. Therefore, they need not be viewed as primitive.

**Not** The single-input Not gate, also known as ‘‘converter,’’ converts its input from
0 to 1 and vice versa. The gate API is as follows:

```
Chip name: Not
Inputs:    in
Outputs:   out
Function:  If in=0 then out=1 else out=0.
```

**And** The And function returns 1 when both its inputs are 1, and 0 otherwise.

```
Chip name: And
Inputs:    a, b
Outputs:   out
Function:  If a=b=1 then out=1 else out=0.
```

**Or** The Or function returns 1 when at least one of its inputs is 1, and 0 otherwise.

```
Chip name: Or
Inputs:    a, b
Outputs:   out
Function:  If a=b=0 then out=0 else out=1.
```

**Xor** The Xor function, also known as ‘‘exclusive or,’’ returns 1 when its two inputs
have opposing values, and 0 otherwise.

```
Chip name: Xor
Inputs:    a, b
Outputs:   out
Function:  If a≠b then out=1 else out=0.
```

**Multiplexor** A multiplexor ([figure 1.8](#1.8)) is a three-input gate that uses one of the
inputs, called ‘‘selection bit,’’ to select and output one of the other two inputs, called
‘‘data bits.’’ Thus, a better name for this device might have been selector. The
name multiplexor was adopted from communications systems, where similar
devices are used to serialize (multiplex) several input signals over a single output
wire.

```
Chip name: Mux
Inputs:    a, b, sel
Outputs:   out
Function:  If sel=0 then out=a else out=b
```

<ImageGroup
  id="1.8"
  :sources="['/1.8.png']"
  type="manual"
  width="600px"
  caption="Figure 1.8 Multiplexor. The table at the top right is an abbreviated version of the truth table on the left."
/>

**Demultiplexor** A demultiplexor ([figure 1.9](#1.9)) performs the opposite function of a
multiplexor: It takes a single input and channels it to one of two possible outputs
according to a selector bit that specifies which output to chose.

```
Chip name: DMux
Inputs:    in, sel
Outputs:   a, b
Function:  If sel=0 then {a=in, b=0} else {a=0, b=in}.
```

<ImageGroup
  id="1.9"
  :sources="['/1.9.png']"
  type="manual"
  width="600px"
  caption="Figure 1.9 Demultiplexor."
/>

### 1.2.3 Multi-Bit Versions of Basic Gates

## 1.3 Implementation

## 1.4 Perspective

## 1.5 Project
