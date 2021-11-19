# Cart API

Note that this API is not written using the REST style - and that's ok :-). The
primary reason for trying this approach was to handle the "Add Product" use-case
in a clean way. This use-case requires an upsert (update if product exists in
the cart, otherwise insert a new order item). This is not a clean operation in
REST. See
[this article](https://nordicapis.com/is-rest-still-a-good-api-design-style-to-use/)
for the approach I adopted here.
