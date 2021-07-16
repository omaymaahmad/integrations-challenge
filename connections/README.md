# Connections - Processors

As stated in the challenge description I began by educating myself on how the life cycle of a transaction. I watched YouTube videos and read articles primiarly, this provided me with the information that a transaction initially goes through:

1. Authorization -> the customers bank will approve method and check for sufficient funds.
2. Capture / Settlement -> as authorizations expire a submit for settlekent is required.
3. Settling -> a transitory state in which the payment is processed.
4. Settled -> funds are transferred from the customers bank account to the merchant account.

## Stripe API and Documentation

After gathering my background I created my account with Stripe and read up on the documentaiton surrounding the API. The site had loads of helpful documentation surrounding how to implement the API in various ways including the SDK information.
The site informs users that the API has predictable resource-oriented URLs, accepted form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

From using Postman to understand how the Stripe API works I learned the API accepts form-data. Meaning when utilising POST methods the Content-Type header should be set to application/x-www-form-urlencoded --> as the data is encoded.

## Authorize()

The Stripe Docs provided an example of the Authorization object repsonse. Showing a transaction ID, amount, status and other details.

The Developers tab provided the API keys: one public and one secret.

The API is set a [paymentIntent] to captured after they are authorized.
The [payment_method_data] parameter is hard-coded to [card] and is a hash object. Card objects may be attached to this hash.
By setting the [payment_method_data] the [payment_method] is set with the card details provided (such as card number, cvv, and expiration date).

The status parameter will be set to [requires_capture] on the [paymentIntent] object.

## Capture()

Payments can only be captured once Authorized.
The [capture] function requires the [paymentIntent] id of the [paymentIntent] you wish to capture.
The status parameter will be set to succeeded on the returned paymentIntent object.

## Cancel()

Requires the [paymentIntent] id of the [paymentIntent] you wish to [cancel].
The status parameter will be set to canceled on the returned paymentIntent object.

## My Experience

This was my first time working with TypeScript, I faced a multitude of challenges adapting from JavaScript to Typscript primarily adapting to the syntax. Another huge challenge was the inability to use the Stripe SDK, all my previous projects incorporating API's have used the given SDK's and so I had to really research the Stripe Docs and API to understand how to make calls. I enjoyed the challenge of not using the SDK as I feel, though I might not have completed the challenge, I pushed myself to gain a new skill.

I believe with the guidance of a senior engineer and more experience with TypeScript I would be able to complete this challenge. Nevertheless, I think with my limited experience and skill set I was able to really test my skills and see what I am capable of when working completely alone.
