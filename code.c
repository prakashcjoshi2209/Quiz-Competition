#include<stdio.h>
#include<stdlib.h>
#include<string.h>
int main(int argc, char const *argv[])
{
    int i=12;
    int j= sizeof(i++);
    printf("%d %d \n", i, j); // 13
    return 0;
}
