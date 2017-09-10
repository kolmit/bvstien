#include "MyAlgo.h"


Node * root;
unsigned int gw = 0;            
int numberOfNodesVisited = 0;



#if 0  
    pthread_t tid[5] = {0};
    pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
    int maskLenghtThread;
    
    int annexe(unsigned char byte){
        pthread_t pth = pthread_self();
        //printf("\tThread.%x: byte %u\n", pth, byte);
        char c, len = 0;
        
        /*if ( byte == 255 || byte == 0 )
            len = (byte%2) * 8;
    
        else {*/
            unsigned int k;
    
            for (c = 7; c >= 0; c--) {
                k = byte >> c;
                if (k & 1)
                  len++;
            }
    
        
        pthread_mutex_lock(&mutex);
        maskLenghtThread += len;
        pthread_mutex_unlock(&mutex);
    }
#endif

    /******************************************
    *************** INIT_MY_ALGO **************
    *******************************************/
    

void initMyAlgo() {
    root = createNode(2);
}


    /******************************************
    ************** INSERT_MY_ALGO *************
    *******************************************/



void insertMyAlgo(unsigned int addr, unsigned int netmask, unsigned int gw) {
   
#if 0
    4 THREAD POUR CHAQUE BYTE DU NETMASK --- 30 fois plus long 
    //printf("netmask = %u\n", netmask);
	maskLenghtThread = 0;

    int lenghtMask = 0;
    void * retValThread;

    int m;
    for (m = 0; m < sizeof(m); ++m) {
        unsigned char byte = *((unsigned char *)&netmask + m);
        pthread_create(&tid[m], NULL, &annexe, byte);
        //printf("\t\ttid+%d = %x\n", m, tid[m]);
    }
    
    for (m = 0; m < sizeof(m); ++m) {
        //printf("\t\t\ttid+%d = %x\n", m, tid[m]);
        pthread_join(tid[m], NULL);
    }


    //	printf("---> LEN MASK THREAD : %d\n", maskLenghtThread);
    if (maskLenghtThread == 0){
        //printf("ADDR: %d - NETMASK: %u", addr, netmask);
        return;
    }
#endif
    

    
    
    int masklen, i = 31, bit[32];

    masklen = convertNetmaskToBinary(netmask); 
    convertToBinary(addr, masklen, bit);      
    
    Node *current = root;    
    
    while (i >= (31 - masklen)) {
        if (bit[i] == 1) {
            if (current->one == NULL){          
                Node * n = createNode(1);
                current->one = n;
                current = current->one; 
                i--;
            }
            else {
                current = current->one;
                i--;
            }
        }
        else {   
            if (current->zero == NULL) {  
                Node * n = createNode(0);
                current->zero = n;
                current = current->zero;
                i--;
            }
            else {
                current = current->zero;       
                i--;
            }
        }
    }
    current->gw = gw;
    
}




    /******************************************
    ****************** LOOKUP *****************
    *******************************************/

unsigned int lookupMyAlgo(unsigned int addr) {
    gw = 0;
    int bit[32];
    convertToBinary(addr, 31, bit); 
    return search(root, addr, 31, bit);
}

unsigned int search(struct node * current, unsigned int addr, int curseur, int * bit) {
     if (current == NULL)   /* Once we got into a NULL node, */
         return gw;         /* we return the last GW found */
        
    if (current->gw != 0)   /* We save the GW until and continue the visit */
        gw = current->gw;
        
    if (curseur == 0)       /* If we reach the end of the address */
        return gw;
        
    if (bit[curseur] == 0)                                      /* The current bit is 0 */
        return  search(current->zero, addr, curseur-1, bit);    /* Recursiv call on the next bit */
    else                                                        /* The current bit is 1 */
        return search(current->one, addr, curseur-1, bit);      /* Recursiv call on the next bit */
}




    /******************************************
    **************** UTILITIES ****************
    *******************************************/

struct node * createNode(unsigned char value) {     /* Create a node and initialize it */
    Node *N = malloc(sizeof(Node)); 
    N->value = value;
    N->gw = 0;
    N->zero = NULL;
    N->one = NULL;
    return N;
}


int convertNetmaskToBinary(unsigned int netmask) {  /* Return the mask length ! */
    unsigned int k;
    char c = 31;
    char reducteur = c;
    char len = 0;
    
    // 255.xxx.xxx.xxx
    /*
    if (netmask > 4278190080){
        len += 8;
        reducteur -= 8;
        // 255.255.xxx.xxx
        if (netmask > 4294901760){
            len += 8;
            reducteur -= 8;
        }
    }
    */
    
    for (c = reducteur; c >= 0; c--) {
        k = netmask >> c;
        if (k & 1)
          len++;
    }
    
    //printf("len : %d\n", len);
    return len;
}


void convertToBinary(unsigned int nbToConvert, int masklen, int *bit) {
    int i, k;

    for (i = 31; i >= (31 - masklen) ; i--) {      /* We JUST convert the network address */
        k = nbToConvert >> i;
        if (k & 1)
          bit[i] = 1;
        else
          bit[i] = 0;
    }
}