#include <stdlib.h> 
#include <stdio.h> 
#include <pthread.h>


#define ChronoStart clock_t chrStart = clock()
#define ChronoPrint printf("---> TEMPS : %f\n", ( ((float) (clock() - chrStart) ) / CLOCKS_PER_SEC) )


typedef struct node Node;
struct node{
    unsigned char value;
    unsigned int gw;
    struct node *one;
    struct node *zero;
};


void initMyAlgo();

void insertMyAlgo(unsigned int addr, unsigned int netmask, unsigned int gw);

unsigned int lookupMyAlgo(unsigned int addr);

int convertNetmaskToBinary(unsigned int netmask);

void convertToBinary(unsigned int nbToConvert, int masklen, int *bit);

struct node * createNode(unsigned char value);

unsigned int search(struct node * current, unsigned int addr, int curseur, int * bit);