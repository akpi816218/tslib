void main() {
	A();
	C();
}

void A() {
	B();
}

void B() {}

void C() {}

----------

Input:

t1, main, Start
t2, A, Start
t3, B, Start
t4, B, End
t5, A, End
t6, C, Start
t7, C, End
t8, main, End

-----------

Output:

main: t8-t1
	A: t5-t2
		B: t4-t3
	C: t7-t6