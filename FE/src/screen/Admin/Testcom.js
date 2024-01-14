import React from "react";

function Testcom() {
  return (
    <div>
      <section style={{backgroundColor: '#eee'}}>
        <div class="container py-5">
          <div class="row">
            <div class="col-md-12 col-lg-4 mb-4 mb-lg-0">
              <div class="card">
                <div class="d-flex justify-content-between p-3">
                  <p class="lead mb-0">Today's Combo Offer</p>
                 
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp"
                  class="card-img-top"
                  alt="Laptop"
                />
                <div class="card-body">
                  <div class="d-flex justify-content-between">
                    <p class="small">
                      <a href="#!" class="text-muted">
                        Laptops
                      </a>
                    </p>
                    <p class="small text-danger">
                      <s>đ</s>
                    </p>
                  </div>

                  <div class="d-flex justify-content-between mb-3">
                    <h5 class="mb-0">HP Notebook</h5>
                    <h5 class="text-dark mb-0">$999</h5>
                  </div>

                  <div class="d-flex justify-content-between mb-2">
                    <p class="text-muted mb-0">
                      Available: <span class="fw-bold">6</span>
                    </p>
                    <div class="ms-auto text-warning">
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testcom;
