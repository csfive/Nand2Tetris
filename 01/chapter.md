# 1 Boolean Logic

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
implementing simple Boolean functions can be interconnected to deliver the func-
tionality of more complex chips. We conclude the background section with a descrip-
tion of how hardware design is actually done in practice, using software simulation
tools

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
the function, illustrated in figure 1.1.
The first three columns of figure 1.1 enumerate all the possible binary values of the
function’s variables. For each one of the $2^n$ possible tuples $(v_1 \dots v_n)$ (here n = 3), the
last column gives the value of $f(v_1 \dots v_n)$.

**Boolean Expressions** In addition to the truth table specification, a Boolean function
can also be specified using Boolean operations over its input variables. The basic
Boolean operators that are typically used are ‘‘And’’ ($x$ And $y$ is 1 exactly when both
$x$ and $y$ are 1) ‘‘Or’’ ($x$ Or $y$ is 1 exactly when either $x$ or $y$ or both are 1),
and ‘‘Not’’ (Not $x$ is 1 exactly when $x$ is 0).
We will use a common arithmetic-like notation for these operations:
$x \cdot y$ (or $xy$) means $x$ And $y$, $x + y$ means $x$ Or $y$, and $\overline{x}$ means Not x.
To illustrate, the function defined in figure 1.1 is equivalently given by the Boolean expression

$$
f(x, y, z)=(x + y) \cdot \overline{z}
$$

For example, let us evaluate this expression on the inputs
$x = 0, y = 1, z = 0$ (third row in the table). Since $y$ is 1, it follows that
$x + y = 1$ and thus $1 \cdot \overline{0} = 1 \cdot 1 = 1$.
The complete verification of the equivalence between the expression and
the truth table is achieved by evaluating the expression
on each of the eight possible input combinations, verifying that it yields the same
value listed in the table’s right column.

### 1.1.2 Gate Logic
