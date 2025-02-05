<template>
    <table class="w-full">
        <thead>
            <tr>
                <th v-for="header in headers" :key="header.id" class="text-t8 p-4 fill-t8 text-sm font-medium">
                    <div class=" flex items-center gap-2">
                        <IconArrowDownSort v-if="header.sort" class="w-4 h-4 fill-p9 cursor-pointer" :class="header.sort.isASC ? 'rotate-180' : ''" @click="selectSorting(header)" />
                        <span v-text="header.label" />
                    </div>
                </th>
            </tr>
        </thead>
        <tbody class="[&>*:last-child]:border-none">
            <tr v-for="row in sortedData" :key="row.id" class="py-2 border-b border-p1">
                <td v-for="(header, i) in headers" :key="header.id" class="text-t8 p-4 text-sm font-normal">
                    <div class="flex items-center" :class="[ i === headers.length - 1? ' justify-end' : ''  ,row[header.name]?.button ? 'justify-end' : '', row[header.name]?.color === 'primary' ? 'text-p7' : '', row[header.name]?.emit ? 'cursor-pointer' : '' ]" @click="$emit(row[header.name]?.emit)">
                        <template v-if="header.type === 'text'">
                            <NuxtImg alt="" v-if="row[header.name]?.img" :src="row[header.name]?.img" format="webp" quality="100" class="h-24 w-24 me-2" />
                            <div class="flex flex-col gap-2">
                                <div class="text-t6" v-text="row[header.name]?.desc" />
                                <div class="flex gap-2">
                                    <div v-text="row[header.name]?.text" />
                                    <template v-if="row[header.name]?.options">
                                        <template v-for="option in row[header.name]?.options" :key="option">
                                            <div class="border-r border-t1" />
                                            <div  class="text-t4 text-sm" v-text="option" />
                                        </template>
                                    </template>
                                </div>
                                <div class="text-xs text-t5" v-text="row[header.name]?.desc || row?.features.map(el => el.text)?.join(' | ')" />
                            </div>
                        </template>
                        <template v-else-if="header.type === 'price'">
                            <div v-text="(row[header.name]?.value || row.price)?.toLocaleString() + ' £'" />
                        </template>
                        <template v-else-if="header.type === 'date'">
                            <div v-text="dateToShow(row[header.name]?.value)" />
                        </template>
                        <template v-else-if="header.type === 'actions'">
                            <div class="flex items-center">
                                <baseButton v-for="button in row[header.name]" :key="button.id" :text="button.text" :startIcon="button.startIcon" :styleType="button.styleType" size="s" @click="$emit(button?.emit || 'click', row.id)" />
                            </div>
                        </template>
                        <template v-else-if="header.type === 'badge'">
                            <BaseBadge :text="row[header.name]?.badge" size="s" :color="row[header.name]?.color" />
                        </template>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
    const props = defineProps({
        headers: Array,
        data: Array,
    })


//// sorting

    const selectedSorting = reactive({header: null, isASC: false, method: null})

    const selectSorting = (header) => {
        header.sort.isASC = !header.sort.isASC
        selectedSorting.isASC = header.sort.isASC
        selectedSorting.header = header.name
        selectedSorting.method = header.sort.method
    }

    const sortedData = computed(() => {
        if(!selectedSorting.header || !selectedSorting.method){
            return props.data
        }else if(selectedSorting.method === 'number'){
            return props.data.sort(compareNumbers)
        }else if(selectedSorting.method === 'date'){
            return props.data.sort(compareDates)
        }else if(selectedSorting.method === 'string'){
            return props.data.sort(compareStrings)
        }else return props.data
    })

    const compareNumbers = (a, b) =>  {
        return (+a[selectedSorting.header].value - +b[selectedSorting.header].value) * (selectedSorting.isASC ? 1 : -1);
    }
    const compareDates = (a, b) =>  {
        return (new Date(a[selectedSorting.header].value).getTime() - new Date(b[selectedSorting.header].value).getTime()) * (selectedSorting.isASC ? 1 : -1);
    }
    const compareStrings = (a, b) =>  {
        return (a[selectedSorting.header].value.toUpperCase() - b[selectedSorting.header].value.toUpperCase()) * (selectedSorting.isASC ? 1 : -1);
    }

//// dateToShow
    const dateToShow = (date) => {
        const newDate = new Date(date)
        return newDate.toDateString().split(' ').splice(1).join(' ')
    }
</script>