export default {
    /*html*/
    template: `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Barbershop</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to="/barbers">Barbers</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/services">Services</router-link>
              </li>
              <li class="nav-item">
              <router-link class="nav-link" to="/barberservices">Barber Services</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/customers">Customers</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/appointments">Appointments</router-link>
              </li>
              
              
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav> 
      <router-view></router-view>
      `
  }