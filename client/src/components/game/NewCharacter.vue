<script lang="ts">
import {defineComponent} from "vue";
import GameApi from "@/apis/GameApi";
import {Modal} from "bootstrap";

export default defineComponent({
    name: 'NewCharacter',
    data() {
        return {
            character: {
                color: '',
                size: 50,
              max_health_points:100,
              health_points:100
            },
            modal: {} as Modal
        }
    },
    mounted() {
        let modal = document.querySelector('#newCharacterModal')
        if (modal) {
            this.modal = new Modal(modal, {});
        }
    },
    methods: {
        newCharacter() {
          GameApi.createCharacter(this.character).then(() => {
                this.modal.hide()
            }).catch(() => {
                this.$store.commit('toast/error', 'Failed to create character')
            })
        },
    }
})
</script>

<template>
    <button class="btn btn-primary"
            @click="modal.show()"
            v-text="'New Character'"></button>
    <div id="newCharacterModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create new character</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="form-group form-floating mb-3">
                        <input v-model="character.color"
                               type="text"
                               class="form-control"
                               id="characterColor"
                               placeholder="character color">
                        <label for="characterColor" v-text="'Character Color'"></label>
                    </div>
                    <div class="form-group form-floating mb-3">
                        <input v-model="character.size"
                               type="text"
                               class="form-control"
                               id="characterSize"
                               placeholder="character size">
                        <label for="characterSize" v-text="'Character Size'"></label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="newCharacter">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>