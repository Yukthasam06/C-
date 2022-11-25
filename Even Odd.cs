using System;

class Main
{
    static void Main(string[] args)
    {
        int a=Convert.ToInt32(Console.ReadLine());
        if(a%2==0){
            Console.WriteLine ("{0} is even",a);
        }
        else{
            Console.WriteLine ("{0} is odd",a);   
        }
    }
}
