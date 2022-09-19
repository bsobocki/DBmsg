### To install boost libraries
```
sudo apt install libboost-all-dev
```

### To compile
```
g++ -I /usr/include/boost/ -pthread test.cpp
```

### To run for local server
```
./a.out 127.0.0.1 3008 "{event:'echoMessage','message'}"
```

Program connects and disconnects but still can't figure out how to send messages which backend understands.

