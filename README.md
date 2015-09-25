# Performance Tests

A few tests used to determine and compare the performance of a few technologies we might use.

## Results

### http
#### 10
```
Done 1000 in 1.854 seconds with concurrency=10
---------------------
Min: 9
Max: 106
Avg: 18.354
```
#### 50
```
Done 1000 in 1.559 seconds with concurrency=50
---------------------
Min: 48
Max: 172
Avg: 76.255
```

### express
#### 10
```
Done 1000 in 1.954 seconds with concurrency=10
---------------------
Min: 7
Max: 108
Avg: 19.377
```
#### 50
```
Done 1000 in 1.739 seconds with concurrency=50
---------------------
Min: 51
Max: 270
Avg: 83.714
```

### rabbitr
#### 10
```
Done 1000 in 4.682 seconds with concurrency=10
---------------------
Min: 25
Max: 97
Avg: 46.606
```
#### 50
```
Done 1000 in 4.887 seconds with concurrency=50
---------------------
Min: 63
Max: 349
Avg: 239.978
```

### amqplib
#### 10
```
Done 1000 in 3.659 seconds with concurrency=10
---------------------
Min: 17
Max: 119
Avg: 36.49
```
#### 50
```
Done 1000 in 3.614 seconds with concurrency=50
---------------------
Min: 47
Max: 382
Avg: 179.391
```
