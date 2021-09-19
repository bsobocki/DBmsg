#include <SFML/Graphics.hpp>
#include "Rectangle.h";

int main()
{
    sf::RenderWindow window(sf::VideoMode(800, 600), "SFML works!");
    // PUT DECLARATIONS HERE
    //                          width   height  x       y
    Rectangle rectangle(window, 50, 50, 100, 100);


    // END DECLARATIONS HERE
    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
                window.close();

            if (sf::Keyboard::isKeyPressed(sf::Keyboard::A)) 
            {
                printf("A");
            }
        }

        window.clear(sf::Color::White);

        // WRITE YOUR CODE HERE
        rectangle.setPosition(50, 100);
        rectangle.setFillColor(sf::Color::Red);
        rectangle.draw();
        
        // END YOUR CODE HERE

        window.display();
    }

    return 0;
}