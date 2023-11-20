package com.example.file_management.cloudwatch;

import software.amazon.awssdk.services.cloudwatchlogs.CloudWatchLogsClient;
import software.amazon.awssdk.services.cloudwatchlogs.model.InputLogEvent;
import software.amazon.awssdk.services.cloudwatchlogs.model.PutLogEventsRequest;
import software.amazon.awssdk.services.cloudwatchlogs.model.CreateLogGroupRequest;
import software.amazon.awssdk.services.cloudwatchlogs.model.CreateLogStreamRequest;
import software.amazon.awssdk.services.cloudwatchlogs.model.DescribeLogStreamsRequest;
import software.amazon.awssdk.services.cloudwatchlogs.model.DescribeLogStreamsResponse;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;

@Service
public class LogService {
    private final CloudWatchLogsClient cloudWatchLogsClient;
    private final String logLoginGroupName = "/my/log/loginGroup";
    private final String logSizeGroupName = "/my/log/sizeGroup";
    private final String logStreamName = "myLogStream";

    public LogService(CloudWatchLogsClient cloudWatchLogsClient) {
        this.cloudWatchLogsClient = cloudWatchLogsClient;
        setupLogging();
    }

    private void setupLogging() {
        try {
            cloudWatchLogsClient.createLogGroup(CreateLogGroupRequest.builder().logGroupName(logLoginGroupName).build());
            cloudWatchLogsClient.createLogGroup(CreateLogGroupRequest.builder().logGroupName(logSizeGroupName).build());
        } catch (Exception e) {
            System.out.println("Log group already exists: " + e.getMessage());
        }

        try {
            cloudWatchLogsClient.createLogStream(CreateLogStreamRequest.builder().logGroupName(logLoginGroupName).logStreamName(logStreamName).build());
            cloudWatchLogsClient.createLogStream(CreateLogStreamRequest.builder().logGroupName(logSizeGroupName).logStreamName(logStreamName).build());
        } catch (Exception e) {
            System.out.println("Log stream already exists: " + e.getMessage());
        }
    }

    public void logLogin(String loginType) {
        String message = String.format("%s login occurred at %s", loginType, new Date().toString());

        DescribeLogStreamsResponse describeLogStreamsResponse = cloudWatchLogsClient.describeLogStreams(
                DescribeLogStreamsRequest.builder().logGroupName(logLoginGroupName).logStreamNamePrefix(logStreamName).build());

        String sequenceToken = describeLogStreamsResponse.logStreams().get(0).uploadSequenceToken();

        PutLogEventsRequest putLogEventsRequest = PutLogEventsRequest.builder()
                .logGroupName(logLoginGroupName)
                .logStreamName(logStreamName)
                .logEvents(Collections.singletonList(
                        InputLogEvent.builder()
                                .timestamp(System.currentTimeMillis())
                                .message(message)
                                .build()))
                .sequenceToken(sequenceToken)
                .build();

        cloudWatchLogsClient.putLogEvents(putLogEventsRequest);
    }

    public void logFileUpload(double sizeInKB) {
        String message = String.format("File uploaded size: %.2f KB", sizeInKB);

        DescribeLogStreamsResponse describeLogStreamsResponse = cloudWatchLogsClient.describeLogStreams(
                DescribeLogStreamsRequest.builder().logGroupName(logSizeGroupName).logStreamNamePrefix(logStreamName).build());

        String sequenceToken = describeLogStreamsResponse.logStreams().get(0).uploadSequenceToken();

        PutLogEventsRequest putLogEventsRequest = PutLogEventsRequest.builder()
                .logGroupName(logSizeGroupName)
                .logStreamName(logStreamName)
                .logEvents(Collections.singletonList(
                        InputLogEvent.builder()
                                .timestamp(System.currentTimeMillis())
                                .message(message)
                                .build()))
                .sequenceToken(sequenceToken)
                .build();

        cloudWatchLogsClient.putLogEvents(putLogEventsRequest);
    }
}