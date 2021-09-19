SFML_FLAGS=-lsfml-graphics -lsfml-window -lsfml-system

att1: compile-att1
	bin/att1.out

att2: compile-att2
	bin/att2.out

mkdir-bin:
	if [ ! -d bin ]; then mkdir bin; fi

compile-att1: mkdir-bin
	g++ attempt1/attempt1.cpp -o bin/att1.out $(SFML_FLAGS)

compile-att2: mkdir-bin
	g++ attempt2/main.cpp -o bin/att2.out $(SFML_FLAGS)

clean:
	rm -rf bin