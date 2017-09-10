all : main

main : main.o MyAlgo.o
	gcc -O3  main.o -Wall -Wextra MyAlgo.o -lpthread -o main

main.o : main.c
	gcc -o main.o -c main.c

MyAlgo.o : MyAlgo.c MyAlgo.h
	gcc -o MyAlgo.o -c MyAlgo.c
	
clean :
	rm main *.o