package com.example.file_management.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {

    @Value("${R2.ACCOUNT_ID}")
    private String accountId;

    @Value("${R2.ACCESS_KEY_ID}")
    private String accessKeyId;

    @Value("${R2.SECRET_KEY_ID}")
    private String secretAccessKey;

    private final String endpoint = "https://" + accountId + ".r2.cloudflarestorage.com";

    @Bean
    public AmazonS3Client amazonS3Client() {
        BasicAWSCredentials awsCredentials= new BasicAWSCredentials(accessKeyId, secretAccessKey);
        return (AmazonS3Client) AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withEndpointConfiguration(
                        new AwsClientBuilder.EndpointConfiguration(endpoint, "us-east-1"))
                .build();

    }
}
