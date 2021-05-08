API docs: https://developers.google.com/fit/rest/v1/reference
Another area https://developers.google.com/fit/scenarios/read-daily-step-total
## Scopes
https://developers.google.com/identity/protocols/oauth2/scopes#fitness

## List datasources

```
GET https://www.googleapis.com/fitness/v1/users/me/dataSources
```

## Example aggregate body

```
POST https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate
{
  "aggregateBy": [
    { "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps" }
  ],
  "bucketByTime": { "durationMillis": 86400000 },
  "startTimeMillis": 1620040978000,
  "endTimeMillis": 1620476578000
}
```


{
  "dataSource": [
    {
      "dataStreamName": "derive_step_deltas<-raw:com.google.step_count.cumulative:HUAWEI:BKL-L09:704d2c37:step counter", 
      "dataType": {
        "field": [
          {
            "name": "steps", 
            "format": "integer"
          }
        ], 
        "name": "com.google.step_count.delta"
      }, 
      "dataQualityStandard": [], 
      "application": {
        "packageName": "com.google.android.gms"
      }, 
      "device": {
        "model": "BKL-L09", 
        "version": "", 
        "type": "phone", 
        "uid": "704d2c37", 
        "manufacturer": "HUAWEI"
      }, 
      "dataStreamId": "derived:com.google.step_count.delta:com.google.android.gms:HUAWEI:BKL-L09:704d2c37:derive_step_deltas<-raw:com.google.step_count.cumulative:HUAWEI:BKL-L09:704d2c37:step counter", 
      "type": "derived"
    }, 
    {
      "dataQualityStandard": [], 
      "dataType": {
        "field": [
          {
            "name": "steps", 
            "format": "integer"
          }
        ], 
        "name": "com.google.step_count.delta"
      }, 
      "dataStreamName": "estimated_steps", 
      "application": {
        "packageName": "com.google.android.gms"
      }, 
      "dataStreamId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps", 
      "type": "derived"
    }, 
    {
      "dataQualityStandard": [], 
      "dataType": {
        "field": [
          {
            "name": "steps", 
            "format": "integer"
          }
        ], 
        "name": "com.google.step_count.delta"
      }, 
      "dataStreamName": "merge_step_deltas", 
      "application": {
        "packageName": "com.google.android.gms"
      }, 
      "dataStreamId": "derived:com.google.step_count.delta:com.google.android.gms:merge_step_deltas", 
      "type": "derived"
    }, 
    {
      "dataQualityStandard": [], 
      "dataType": {
        "field": [
          {
            "name": "steps", 
            "format": "integer"
          }
        ], 
        "name": "com.google.step_count.cumulative"
      }, 
      "dataStreamName": "step counter", 
      "device": {
        "model": "BKL-L09", 
        "version": "", 
        "type": "phone", 
        "uid": "704d2c37", 
        "manufacturer": "HUAWEI"
      }, 
      "dataStreamId": "raw:com.google.step_count.cumulative:HUAWEI:BKL-L09:704d2c37:step counter", 
      "type": "raw"
    }
  ]
}