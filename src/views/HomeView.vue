<template>
  <div class="flex flex-col h-screen max-h-screen">
    <div class="z-20 flex justify-center relative bg-hero-pattern bg-cover px-4 pt-8 pb-32">    
        <div class="w-full max-w-screen-sm">
          <h1 class="text-white text-center text-3xl pb-4">IP Address Tracker</h1>
          <div class="flex">
          <input
            v-model="queryIp"
            class="flex-1 py-5 px-4 rounded-tl-md rounded-bl-md focus:outline-none"
            type="text"
            placeholder="Search for any IP address or domain"
          />
          <i
            @click="getIpInfo"
            class="cursor-pointer
          bg-black
          text-white
          px-4
          rounded-tr-md
          rounded-br-md
          flex
          items-center
          fas fa-chevron-right"
          ></i>
          </div>
        </div>
        <IPInfo v-if="ipInfo" v-bind:ipInfo="ipInfo"/>

    </div>
    <div id="mapid" class="h-full z-10">
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import IPInfo from "../components/IPInfo";
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
import axios from "axios"
export default {
  name: "HomeView",
  components: {IPInfo},
  setup() {
    let mymap;

    const queryIp = ref("");
    const ipInfo = ref(null);



    onMounted(() => {
      // console.log(process.env.VUE_APP_MAPBOX_API_KEY)
      console.log( `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_API_KEY}`)
      mymap = leaflet.map("mapid").setView([35.4676, -97.5164], 9);
      leaflet
        .tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_API_KEY}`,
               
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,  
            zoomOffset: -1,
            accessToken: process.env.VUE_APP_MAPBOX_API_KEY
          }
        )
        .addTo(mymap);

      });

      //fets ip information from API
        const getIpInfo = async () => {
          try {
            const data = await axios.get(
              `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.VUE_APP_GEO_API_KEY}&ipAddress=${queryIp.value}`

            );
            const result = data.data; 
            console.log(result)
            ipInfo.value = {
              address: result.ip,
              state: result.location.region,
              timezone: result.location.timezone,
              isp: result.isp,
              lat: result.location.lat,
              lng: result.location.lng,
            };
            leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]).addTo(mymap);
            mymap.setView([ipInfo.value.lat, ipInfo.value.lng], 13)

          } catch(err) {
            alert(err.message)
          }
        }

        return { queryIp, ipInfo, getIpInfo}
  },
};
</script>
