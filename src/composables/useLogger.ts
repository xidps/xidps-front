import {ref} from "vue";


function useLogger(){

    const visible = ref(false);
    const message = ref("");
    const timeout = ref(3000);

    const error = () => {

    }

    return {

    }
}


// useLoggerStore -> info(message)
