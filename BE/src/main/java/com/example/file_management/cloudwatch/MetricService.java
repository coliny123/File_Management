package com.example.file_management.cloudwatch;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.cloudwatch.CloudWatchClient;
import software.amazon.awssdk.services.cloudwatch.model.MetricDatum;
import software.amazon.awssdk.services.cloudwatch.model.PutMetricDataRequest;
import software.amazon.awssdk.services.cloudwatch.model.StandardUnit;

@Service
public class MetricService {

    private final CloudWatchClient cloudWatchClient;

    public MetricService(CloudWatchClient cloudWatchClient) {
        this.cloudWatchClient = cloudWatchClient;
    }

    public void recordLogin(String loginType) {
        PutMetricDataRequest request = PutMetricDataRequest.builder()
                .namespace("MyService")
                .metricData(MetricDatum.builder()
                        .metricName(loginType + "Login")
                        .value(1.0)
                        .unit(StandardUnit.COUNT)
                        .build())
                .build();
        cloudWatchClient.putMetricData(request);
    }

    public void recordUploadFileSize(long fileSize) {
        PutMetricDataRequest request = PutMetricDataRequest.builder()
                .namespace("MyService")
                .metricData(MetricDatum.builder()
                        .metricName("UploadFileSize")
                        .value((double) fileSize)
                        .unit(StandardUnit.BYTES)
                        .build())
                .build();
        cloudWatchClient.putMetricData(request);
    }
}
