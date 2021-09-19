#pragma once
#include <SFML/Graphics.hpp>
#include <string>

class Rectangle
{
public:
	int x;
	int y;
	int width;
	int height;
	int outline;

	sf::RectangleShape rectange;
	sf::RenderWindow* window;

	Rectangle(sf::RenderWindow& window, int width=0, int height=0, int x = 0, int y = 0, int outline = 5)
	{
		this->x = x;
		this->y = y;
		this->width = width;
		this->height = height;
		this->outline = outline;
		this->window = &window;

		this->rectange.setPosition(x, y);
		this->rectange.setSize(sf::Vector2f(width, height));
		this->rectange.setOutlineColor(sf::Color::Black);
		this->rectange.setOutlineThickness(outline);
	}

	void setPosition(int x, int y)
	{
		this->x = x;
		this->y = y;
	}

	void setSize(int width, int height)
	{
		this->width = width;
		this->height = height;
	}

	void setFillColor(sf::Color color)
	{
		this->rectange.setFillColor(color);
	}

	void setOutline(sf::Color color)
	{
		this->rectange.setOutlineColor(color);
	}


	void draw()
	{
		window->draw(rectange);
	}
};

