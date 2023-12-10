<template>
    <div class="search">
        <div class="bar">
            <input 
                type="text" 
                class="sabrina"
                v-model="searchTerm"
                placeholder="search your citation">
        </div>
        <div class="button">
            <button @click="searchCitation">Search</button>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { ref, type Ref } from 'vue';

    interface Citation {
        category: string;
    }


    const citations: Ref<Citation[]> = ref([]);
    const searchTerm: Ref<string> = ref("");

    const searchCitation = async () => {
        try{
                const result = await fetch(`http://localhost:3000/api/citation/id/${searchTerm.value}`);
                if (result.ok) {
                    const data = await result.json();
                    citations.value = data;
                } else{
                    await searchByCategory();
                }
            } catch(error){
                console.error("error searching citations:", error);
            }
    }

    const searchByCategory = async () => {
        try{
            const response = await fetch(`http://localhost:3000/api/citation/category/${searchTerm.value}`);
            if (response.ok) {
                const data = await response.json();
                citations.value = data;
            } else{
                console.error("no result found");
            }
        } catch(error){
            console.error("error searching citations by category:", error);
        }
    }


</script>
