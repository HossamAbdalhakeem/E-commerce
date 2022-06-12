<template>
  <div>
    <div class="profile d-flex justify-center position-relative align-center">
      <div class="img-container " v-if="currentUser">
        <div>
          <img
            v-if="currentUser.image"
            :src="currentUser.image"
            class="rounded-circle"
            width="70"
            height="70"
          />
          <v-icon v-else class="accountIcon">mdi-account-circle</v-icon>
          <v-btn
            :loading="imgloading"
            class="iconCover"
            icon
            @click="onpicfileimg"
          >
            <v-icon>mdi-camera</v-icon>
          </v-btn>
        </div>
      </div>
      <input
        type="file"
        style="display: none"
        ref="fileimgProfile"
        accept="image"
        @change="uploadImgProfile"
      />
    </div>

    <div class="pt-8">
      <div>
        <div class="d-flex ">
          <span class="font-weight-bold">name:</span>
          <p class="ml-3">{{ currentUser.name }} {{ currentUser.lastname }}</p>
        </div>
      </div>
      <div>
        <div class="d-flex ">
          <span class="font-weight-bold">Email:</span>
          <p class="ml-3">{{ currentUser.email }}</p>
        </div>
      </div>
      <div>
        <div class="d-flex ">
          <span class="font-weight-bold">Phone:</span>
          <p class="ml-3">{{ currentUser.phoneNum }}</p>
        </div>
      </div>

      <div>
        <div class="d-flex ">
          <span class="font-weight-bold">address:</span>
          <p class="ml-3">{{ currentUser.address }}</p>
        </div>
      </div>
      <div>
        <div class="d-flex ">
          <span class="font-weight-bold">companyName:</span>
          <p class="ml-3">{{ currentUser.companyName }}</p>
        </div>
      </div>

      <div>
        <div class="d-flex ">
          <span class="font-weight-bold">Postcode:</span>
          <p class="ml-3">{{ currentUser.postcode }}</p>
        </div>
      </div>

      <div>
        <div class="d-flex ">
          <span class="font-weight-bold">Country:</span>
          <p class="ml-3">{{ currentUser.country }}</p>
        </div>
      </div>
      <div>
        <div class="d-flex ">
          <span class="font-weight-bold">City:</span>
          <p class="ml-3">{{ currentUser.city }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storge } from "../../firebase";

export default {
  props: ["currentUser"],
  data() {
    return {
      imgloading: false,
    };
  },
  methods: {
    uploadImgProfile(e) {
      this.piceProfile = e.target.files[0];
      this.namePiceProfile = this.piceProfile.name;
      let storgeref = storge.ref("coverPic/" + this.namePiceProfile);
      let uploaad = storgeref.put(this.piceProfile);
      // uploaad.on("state_changed", (FIRST) => {},(SECOND) => {})
      uploaad.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          this.imgloading = true;
        },
        () => {
          // Handle unsuccessful uploads
        },
        () => {
          console.log("here yrk");
          uploaad.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            this.imgloading = false;
            this.image = downloadURL;
            this.$store.dispatch("uploadimgProfile", this.image).then(() => {
                this.ToasteSuccessMsg("Profile picture posted");
            });
          });
        }
      );
    },
    onpicfileimg() {
      this.$refs.fileimgProfile.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  width: 10rem;
  margin: 0 auto;
}
.iconCover {
  position: absolute;
  top: 44px;
  border-radius: 50%;
  left: 23px;
  background-color: rgb(218, 218, 218);
}
.accountIcon {
  font-size: 5rem;
}
</style>
