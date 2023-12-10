<template>
    <div class="create-citation">
        <h3>CREATE YOUR CITATION</h3>

        <form id="new-citation-form" @sublit.prevent="addCitation">
            <input 
                type="text"
                name="citation"
                id="citation" 
                placeholder="make your inspitation" 
                v-model="input_content"
            />

            <h4>Pick a category</h4>
            <div class="options">
                <label v-for="category in categories" :key="category">
                    <input 
                    type="radio" 
                    :name="category" 
                    :id="category"
                    :value="category"
                    v-model="input_category"
                    />
                    <span :class="`bubble ${category.toLowerCase()}`"></span>
					<div>{{ category }}</div>
                </label>

                <!--exemple category-->
                <label>
						<input 
							type="radio" 
							name="category" 
							id="category2" 
							value="personal"
							v-model="input_category" />
						<span class="bubble personal"></span>
						<div>Personal</div>
				</label>
            </div>
            <input type="submit" @click="addCitation()" value="new citation">
        </form>
    </div>
</template>

<script setup lang="ts">

import { ref, onMounted, type Ref } from "vue";

    interface Citation {
        content: string;
        category: string | null;
        categoryClass: string | null;
        createdAt: number;
    }

    const citations: Ref<Citation[]> = ref([]);
    const categories: Ref<string[]> = ref([]);
    const input_content: Ref<string> = ref('');
    const input_category: Ref<string | null> = ref('');

    
    const addCitation = async () => {
        try{
            if (input_content.value.trim() === '' || input_category.value === null) {
                return;
            }

            const newCitation: Citation = {
                content: input_content.value,
                category: input_category.value,
                createdAt: new Date().getTime(),
                categoryClass: input_category.value?.toLocaleLowerCase() || null,
}

            const result = await fetch('http://localhost:3000/api/citation/add-citation', {
                method: 'POST',
                body: JSON.stringify(newCitation),
            });
            if (result.ok) {
                citations.value.push(newCitation);
            }else{
                console.error('failed to add citation');
            }
        }catch(error){
            console.error('error adding citation:', error);
        }
    }
    

    const fetchCategories = async () => {
        try{
            const result = await fetch('http://localhost:3000/api/citation/categories');
            if (result.ok) {
                const data = await result.json();
                categories.value = data;
            }else{
                console.error("failed to fetch categories");
            }
        }catch (error){
            console.error("error fetching categories:", error);
        }
    }

    onMounted(async () => {
        await fetchCategories();
    })
</script>
