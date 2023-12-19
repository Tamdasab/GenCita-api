<template>
    <div class="search">
        <div class="bar">
            <input 
                type="text" 
                class="inp"
                v-model="category"
                placeholder="search your citation by category">
        </div>
        <div class="button">
            <button @click="searchByCategory">Search</button>
        </div>
    </div>
    <div class="citation-list">
        <h3>CITATION LIST</h3>
        <div class="list" id="citation-list">
            <div v-if="!searched || (searchResults && searchResults.length > 0)">
                <div v-if="!searched">
                    <div v-for="citation in citations" :key="citation.id" :class="`citation-item ${citation.done && 'done'}`">
                        <div class="citation-content">
                            <p>
                                "{{ citation.text  }}"
                            </p>
                            <p class="citation-category">
                                Category : {{ citation.category }}
                            </p>
                        </div>
                        <div class="actions">
                            <button class="delete" @click="removeCitation(citation)">Delete</button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div v-for="citation in searchResults" :key="citation.id" :class="`citation-item ${citation.done && 'done'}`">
                        <div class="citation-content">
                          <p>
                            "{{ citation.text }}"
                          </p>
                          <p class="citation-category">
                            Category : {{ citation.category }}
                          </p>
                        </div>
                        <div class="actions">
                          <button class="delete" @click="removeCitation(citation)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>No citations available</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, defineProps, type Ref } from "vue";

    interface Citation{
        text: string;
        category: string | null;
        createdAt: number;
        done: boolean;
        id: number;
    }

    const category = ref('');
    const searched = ref(false);
    const searchResults: Ref<Citation[]> = ref([]);
    const { citations: propCitations} = defineProps(['citations']);
    const citations: Ref<Citation[]> = ref(propCitations);

    const searchByCategory = async () => {
        try{
            const response = await fetch(`http://localhost:3000/api/citation/category/${category.value}`);
            if (response.ok) {
                const data = await response.json();
                searchResults.value = data;
                searched.value = true;
            } else{
                console.error("no result found");
            }
        } catch(error){
            console.error("error searching citations by category:", error);
        }
    }

    const fetchCitations = async () => {
        try{
            const result = await fetch('http://localhost:3000/api/citation/all-citations');
            const data = await result.json();
            citations.value = data;
        } catch(error){
            console.error('error fetching citations:', error);
        }
    }

    onMounted(fetchCitations);

    const removeCitation = async (citation: Citation) => {
        try{
            const result = await fetch(`http://localhost:3000/api/citation/${citation.id}`, {
                method: 'DELETE',
            })

            if (result.ok) {
                citations.value = citations.value.filter((c: Citation) => c !== citation);
            } else{
                console.error('failed to remove citation');
            }

        } catch(error){
            console.error('error removing citation:', error);
        }
    }

</script>