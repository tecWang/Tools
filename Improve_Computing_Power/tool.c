#include <stdio.h>
#include <stdlib.h>
#include <time.h> //用到了time函数 
#define MINNUMBER 10000
#define MAXNUMBER 100000
int main()
{  
    int i;
    long number1 = 0,number2 = 0,value = 0;
    srand((unsigned) time(NULL)); //用时间做种，每次产生随机数不一样
    printf("Enter the calculation result:\n");
    for (i=1; i<=5; i++)    // 生成五组数，全部计算成功后退出程序
    {
        // 确认生成五位数的随机数
        while(number1 < MINNUMBER || number2 < MINNUMBER){
            if(number1 < MINNUMBER)
                number1 = rand() % MAXNUMBER;
            if(number2 < MINNUMBER)
                number2 = rand() % MAXNUMBER;
        }

        // 显示在命令行的内容
        printf("%d * %d = ",number1, number2);
        scanf("%d",&value);

        // 判断正误
        while(value != number1*number2){
            printf("fail\n");
            printf("%d * %d = ",number1, number2);
            scanf("%d",&value);
        }
        printf("success!\n");
        number1 = 0; number2 = 0;
        printf("============================================\n");
    }  
    printf("Congratulations pass!\n");
    system("pause"); 
    return 0;
}