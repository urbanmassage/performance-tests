# Performance Tests

A few tests used to determine and compare the performance of a few technologies we might use.

## Results
With concurrency *10*:
```
http     in 1847ms  min  6  avg 18.277 max   81
express  in 2017ms  min 11  avg 20.099 max   66
rabbit   in 5657ms  min 27  avg 56.315 max  210
amqplib  in 4053ms  min 17  avg 40.451 max  124
```

With concurrency *50*:
```
http     in 1562ms  min 47  avg  77.062 max 149
express  in 1552ms  min 54  avg  76.654 max 124
rabbit   in 4784ms  min 83  avg 233.911 max 319
amqplib  in 3630ms  min 49  avg 180.352 max 324
```
