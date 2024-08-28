package com.prabod.backend.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Response {

    private boolean status;
    private String message;
    private Object data;

    public static class ResponseBuilder{
        public ResponseBuilder(){}
    }


}
