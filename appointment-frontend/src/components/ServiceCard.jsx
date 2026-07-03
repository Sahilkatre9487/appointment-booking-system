function ServiceCard({ service }) {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">

      <div className="card shadow-sm border-0 h-100">

        <div className="card-body text-center">

          <i className="bi bi-grid display-5 text-primary"></i>

          <h5 className="mt-3">
            {service.serviceName}
          </h5>

        </div>

      </div>

    </div>
  );
}

export default ServiceCard;