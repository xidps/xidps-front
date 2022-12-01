import Excel from "exceljs"
import {IUser} from "@/types";
import {IEditUser, IExcelUser, IUserRow} from "@/types/views/admin/user";

/*
export async function useExcel() {
    /!*try {
        // 엑셀 생성
        const workbook = new Excel.Workbook();

        // 생성자
        workbook.creator = '작성자';

        // 최종 수정자
        workbook.lastModifiedBy = '최종 수정자';

        // 생성일(현재 일자로 처리)
        workbook.created = new Date();

        // 수정일(현재 일자로 처리)
        workbook.modified = new Date();


        // addWorksheet() 함수를 사용하여 엑셀 시트를 추가한다.
        // 엑셀 시트는 순차적으로 생성된다.
        workbook.addWorksheet('Sheet One');
        workbook.addWorksheet('Sheet Two');
        workbook.addWorksheet('Sheet Three');

        // 엑셀 시트를 접근하는 방법은 세 가지 방법이 존재한다.
        // 1. getWorksheet() 함수에서 시트 명칭 전달
        const sheetOne = workbook.getWorksheet('Sheet One');

        // 2. getWorksheet() 함수에서 시트 인덱스 전달
        const sheetTwo = workbook.getWorksheet(1);

        // 3. 대괄호 표기법
        const sheetThree = workbook.worksheets[2];

        // removeWorksheet() 함수를 사용하여 엑셀 시트를 제거한다.
        workbook.removeWorksheet(sheetThree.id);

        // 컬럼 설정
        // header: 엑셀에 표기되는 이름
        // key: 컬럼을 접근하기 위한 key
        // hidden: 숨김 여부
        // width: 컬럼 넓이
        sheetOne.columns = [
            {header: '이름', key: 'name', width: 40},
            {header: '성별', key: 'gender', hidden: false, width: 30},
            {header: '부서코드', key: 'deptCode', width: 60},
            {
                header: '부서명', key: 'deptName', width: 100,
                // 스타일 설정
                style: {
                    // Font 설정
                    font: {name: 'Arial Black', size: 20},
                    // Borders 설정
                    border: {
                        top: {style: 'thin', color: {argb: 'FF00FF00'}},
                        left: {style: 'thin', color: {argb: 'FF00FF00'}},
                        bottom: {style: 'thin', color: {argb: 'FF00FF00'}},
                        right: {style: 'thin', color: {argb: 'FF00FF00'}},
                    },
                    // Fills 설정

                }
            }
        ]

        const sampleData = [
            {name: '홍길동', code: 'A100', gender: 'F', entryDate: '20200101', deptCode: 'A1000', deptName: '금융팀'},
            {name: '마이콜', code: 'A200', gender: 'F', entryDate: '20200201', deptCode: 'A2000', deptName: '자산팀'},
            {name: '둘리', code: '9999991234567', gender: 'M', entryDate: '20200301', deptCode: 'A1000', deptName: '금융팀'},
            {name: '또치', code: '9999992234567', gender: 'M', entryDate: '20200401', deptCode: 'A2000', deptName: '자산팀'}
        ];
        sampleData.map((item, index) => {
            sheetOne.addRow(item);

            // 추가된 행의 컬럼 설정(헤더와 style이 다를 경우)
            for (let loop = 1; loop <= 4; loop++) {
                const col = sheetOne.getRow(index + 2).getCell(loop);
                col.font = {name: 'Arial Black', size: 40};
            }
        });

        const data = await workbook.xlsx.writeBuffer();
        const blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `테스트.xlsx`;
        anchor.click();
        //window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error(error);
    }*!/
}

*/

interface IExcelHeader {
    header: string;
    key: string
}

export async function useExcel(columns: IExcelHeader[], sampleData: any[]) {
    const workbook = new Excel.Workbook;

    workbook.creator = 'xidps';
    workbook.lastModifiedBy = 'xidps visitor';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.addWorksheet("user upload example");

    const exampleSheet = workbook.getWorksheet("user upload example");

    exampleSheet.columns = columns;
    sampleData.forEach((item) => {
        exampleSheet.addRow(item);

    });
    const data = await workbook.xlsx.writeBuffer();
    const blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `사용자_추가_예시.xlsx`;
    anchor.click();

    window.URL.revokeObjectURL(url);
}

export async function useUploadExcel(file: File): Promise<IExcelUser[]> {

    const wb = new Excel.Workbook();
    const reader = new FileReader()

    reader.readAsArrayBuffer(file)

    const data: IExcelUser[] = [];

    return new Promise((resolve, reject) => {
        try {
            reader.onload = async () => {
                if (reader.result === null) {
                    return;
                }

                const buffer = reader.result;

                if (typeof buffer === 'string') {
                    return;
                }

                const workbook = await wb.xlsx.load(buffer);
                const sheet = workbook.getWorksheet("user upload example")

                sheet.eachRow((row, rowNumber) => rowNumber !== 0 ? data.push(rowToUserRow(row)) : "");
                resolve(data);
            }
            reader.onerror = (e) => {
                reject(e);
            }
        } catch (e) {
            reject(e);
        }
    })
}

function rowToUserRow(row: Excel.Row): IExcelUser {
    return {
        userId: row.getCell(2).text,
        name: row.getCell(3).text,
        phoneNumber: row.getCell(4).text,
        divisionValue: row.getCell(5).text,
        var1: "",
        var2: "",
        var3: "",
        var4: ""
    }
}











