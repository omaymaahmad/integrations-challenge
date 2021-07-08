import {
  APIKeyCredentials,
  CardDetails,
  ParsedAuthorizationResponse,
  ParsedCancelResponse,
  ParsedCaptureResponse,
  ProcessorConnection,
  RawAuthorizationRequest,
  RawCancelRequest,
  RawCaptureRequest,
} from '@primer-io/app-framework';

import HttpClient from '../common/HTTPClient';
import { HTTPRequest, HTTPResponse } from '../common/HTTPClient';

import 'dotenv/config';
import { Response } from 'node-fetch';
import { URLSearchParams } from 'url';

let accountId: string = process.env.STRIPE_AC || '';

let apiKey: string = process.env.STRIPE_SECRET_KEY || '';

const StripeConnection: ProcessorConnection<APIKeyCredentials, CardDetails> = {
  name: 'STRIPE',

  website: 'stripe.com',

  configuration: {
    accountId: accountId,
    apiKey: apiKey,
  },

  /**
   *
   * You should authorize a transaction and return an appropriate response
   */
  async authorize(
    request: RawAuthorizationRequest<APIKeyCredentials, CardDetails>,
  ): Promise<ParsedAuthorizationResponse> {
    try {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${request.processorConfig.apiKey}`,
      };

      //async function getPaymentMethodId(paymentMethodDetails): Promise<string> {
      const url: string = 'https://api.stripe.com/v1/payment_methods';

      const searchUrl = new URLSearchParams({
        'type': 'card',
        'card[number]': `${request.paymentMethod.cardNumber}`,
        'card[exp_month]': `${request.paymentMethod.expiryMonth}`,
        'card[exp_year]': `${request.paymentMethod.expiryYear}`,
        'card[cvc]': `${request.paymentMethod.cvv}`,
      });

      const options: HTTPRequest = {
        method: 'post',
        body: searchUrl.toString(),
        headers: headers,
      };

      const response: HTTPResponse = await HttpClient.request(url, options);
      const paymentMethod = response.responseText;
      console.log(JSON.parse(paymentMethod));
      // const paymentMethodId = JSON.parse(paymentMethod).id;
      // const approveUrl: string = `https://api.stripe.com/v1/issuing/authorizations/${paymentMethodId}`;
      // const approveOptions: HTTPRequest = {
      //   method: 'get',
      //   headers: headers,
      // };
      // const res: HTTPResponse = await HttpClient.request(
      //   approveUrl,
      //   approveOptions,
      // );
      // console.log(res.responseText);
      return JSON.parse(paymentMethod);
    } catch {
      throw new Error('Method Not Implemented');
    }

    //   return paymentMethodId;
    // }
  },

  /**
   * Capture a payment intent
   * This method should capture the funds on an authorized transaction
   */
  capture(
    request: RawCaptureRequest<APIKeyCredentials>,
  ): Promise<ParsedCaptureResponse> {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ${request.processorConfig.apiKey}',
    };

    // const url: string = 'https://api.stripe.com/v1/payment_methods/capture';

    // const options: HTTPRequest = {
    // method: 'post',
    //body: '',
    // headers: headers,
    //};

    //const responseCapture: HTTPResponse = HttpClient.request(
    // url,
    //options,
    // );

    throw new Error('Method Not Implemented');
  },

  /**
   * Cancel a payment intent
   * This one should cancel an authorized transaction
   */
  cancel(
    request: RawCancelRequest<APIKeyCredentials>,
  ): Promise<ParsedCancelResponse> {
    throw new Error('Method Not Implemented');
  },
};

export default StripeConnection;
