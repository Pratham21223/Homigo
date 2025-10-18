# SPC Assignment

Experiment 1:
Write a program to swap two variables’ values with and without using third variables.
Write an algorithm and draw flowchart for the same.

Solution : 

```c

#include <stdio.h>
//With using Third Variable
void main(){
    int a, b,temp;
    printf("Enter two numbers: ");
    scanf("%d %d",&a,&b);
    printf("You entered a = %d b = %d \n",a,b);
    temp = a;
    a=b;
    b=temp;
    printf("The values of a and b after swapping: \n a = %d b = %d",a,b);
}

//Without using third varible
void main(){
    int a, b;
    printf("Enter two numbers: ");
    scanf("%d %d",&a,&b);
    printf("You entered a = %d b = %d \n",a,b);
    printf("The values of a and b after swapping: \n a = %d b = %d",b,a);
}
```

Experiment 2:
Write a program to check odd or even number:
(a) using modulus operator
(b) using a conditional operator.

Solution : 

```c

#include <stdio.h>
//Using Modulo Operator
void main(){
    int n;
    printf("Enter a number to check whether it is an odd or even number: ");
    scanf("%d",&n);
    if(n%2==0)
    printf("%d is an Even Number",n);
    else
    printf("%d is an Odd Number",n);
}

//Using Conditional Operator
void main(){
    int n;
    printf("Enter a number to check whether it is an odd or even number: ");
    scanf("%d",&n);
    printf("%d is an %s Number",n, n%2==0 ? "Even" : "Odd");
}
```

Experiment 3:
Design and develop a C program to read a year as an input and find whether it is a leap year or not.
Also consider the end of the centuries. Write an algorithm and draw flowchart for the same.

Solution : 

```c
#include <stdio.h>

void main(){
    int n;
    printf("Enter year to check for leap year: ");
    scanf("%d",&n);
    if((n%4==0 && n%100!=0) || n%400==0)
    printf("%d is a Leap Year",n);
    else
    printf("%d is not a Leap Year",n);
}

```

Experiment 4:
Write a C program to find the sum of individual digits of a 3-digit number.

Solution : 

```c
#include <stdio.h>

void main(){
    int n,sum,d1,d2,d3;
    printf("Enter a 3 digit number to find sum of digits: ");
    scanf("%d",&n);
    if(n/1000 > 0 && n/100 < 0 ) 
    printf("Please enter a valid 3 digit number");
    else{
        d1 = n % 10;
        d2 = (n / 10)%10;
        d3 = (n / 100)%100;
        sum = d1 + d2 + d3;
        printf("The sum of digits of %d = %d",n,sum);
    }
}

```

Experiment 5:
Design and develop a flowchart or an algorithm that takes three coefficients (a, b, and c) of a quadratic equation (ax² + bx + c = 0) as input and compute all possible roots.
Implement a C program for the developed flowchart/algorithm and execute the same to output the possible roots for a given set of coefficients with appropriate messages.

Solution : 

```c
#include <stdio.h>
#include <math.h>
void main(){
    float a,b,c,disc,x1,x2;
    printf("Enter a,b,c in ax^2 + bx + c = 0 : ");
    scanf("%f %f %f",&a,&b,&c);
    disc = b*b - 4 * a * c;
    if(disc!=0){
    x1 = (-b + pow(disc,0.5))/2*a;
    x2 = (-b - pow(disc,0.5))/2*a;
    printf("The roots of the equation are %f %f",x1,x2);
    }
    else if(disc==0){
        x1 = -b/2*a;
        printf("The solution of the equation is %f",x1);
    }
    else{
        printf("Discriminant of the equation is %f so roots are imaginary",disc);
    }
}
```

Experiment 6:
Write a program to count the number of digits in a given integer.

Solution : 

```c
#include <stdio.h>

void main(){
    int n,count=0;
    printf("Enter a number to count it's digits: ");
    scanf("%d",&n);
    while (n>0)
    {
        count++;
        n/=10;
    }
    printf("The number of digits is %d",count);
}
```

Experiment 7:
Write a menu-driven program to perform simple arithmetic operations based on the user's choice.
The user will indicate the operation to be performed using the signs (e.g. + for addition, etc).
Write an algorithm and draw flowchart for the same.

Solution : 

```c

#include <stdio.h>
void main(){
    int a, b,ans=0;
    char choice;
    
    printf("Enter two numbers: ");
    scanf("%d %d",&a,&b);
    printf("You entered a = %d b = %d \n",a,b);
    printf("Enter + for Addition\nEnter - for Subraction\nEnter * for Multiplication\nEnter / for Division\nEnter %% for Modulus\n Enter your choice : ");
    scanf(" %c",&choice);
    if(choice == '+') ans = a + b;
    else if(choice == '-') ans = a - b;
    else if(choice == '*') ans = a * b;
    else if(choice == '/') ans = a / b;
    else if(choice == '%') ans = a % b;
    else printf("Enter a correct Choice");
    if(ans!=0) printf("%d %c %d = %d",a,choice,b,ans); 
}

```

Experiment 8:
Write a program to read a number of more than one digit, reverse the number and display the sum of digits of numbers.
Write an algorithm and draw flowchart for the same.

Solution : 

```c
#include <stdio.h>
void main(){
    int n,rem=0,sum=0,rev=0;
    printf("Enter a number to reverse and print the sum of the digits: ");
    scanf("%d",&n);
    if(n/10>0 || n==10){
        while (n>0)
        {
            rem=n%10;
            sum+=rem;
            rev=rev*10+rem;
            n/=10;
        }
        printf("The reverse of the number is %d and sum of its digits is %d",rev,sum);
    }
    else printf("Please enter a number with its digits greater than 1");
}
```

Experiment 9:
Write programs to display each of the following patterns:

![Screenshot 2025-10-17 231018.png](Screenshot_2025-10-17_231018.png)

Solution : 

```c
#include <stdio.h>
//A
void main(){
    int n,i,j;
    printf("Enter the value of n to print the pattern: ");
    scanf("%d",&n);
    for ( i = 1; i <=n; i++)
    {
        for ( j = i; j > 0 ; j--)
        {
            printf("%d ",j);
        }
        printf("\n");
    }
}
//B
void main(){
    int n,i,j,k,sp;
    char ch1,ch2;
    printf("Enter the value of n to print the pattern: ");
    scanf("%d",&n);
    for ( i = 1; i <=n; i++)
    {
        for(sp=n-i+1;sp>0;sp--){
            printf(" ");
        }
        ch1='A';
        for ( j = 1; j <= i ; j++)
        {
            printf("%c",ch1++);
        }
        ch2='A';
        for ( k = i-2; k >=0 ; k--)
        {
            printf("%c",ch2+k);
        }
        printf("\n");
    }
}
```
